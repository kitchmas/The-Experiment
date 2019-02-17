import { TileTypes, SeedTypes, PlantLifeStatus, WeedLifeStatus } from "../../components/board-game/tile-enums";

class Tile {
    name = "Tile"
    description = "A Tile";
    type = TileTypes.None;
    className = "tile";
    score = 0;
    canRescore = false;
    selected = false;
    destroyed = false;
    clone = function() {
        var newTile = new Tile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new Tile();
    }
    canReplaceTile = function(tile) {
        return false;
    }
    tryPlaceTileOntop = function(tile) {
        return;
    }
    startGrowing = function() {
        return;
    }
    finishGrowing = function() {
        return;
    }
    canAttack = function() {
        return false;
    }
    attack = function() {
        return false;
    }
    rescore = function() {
        return this.score;
    }
    getScore = function() {
        this.canRescore = false;
        return this.score;

    }
}

class EmptyTile extends Tile {
    constructor() {
        super();
    }
    name = ""
    description = "A Simple empty tile. Dose nothing special";
    type = TileTypes.None;
    className = "empty-tile";
    score = 0;
    clone = function() {
        var newTile = new EmptyTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new EmptyTile();
    }
    canReplaceTile = function(tile) {
        switch (tile.type) {
            case TileTypes.Soil:
                return true;
                break;
            case TileTypes.Rock:
                return true;
                break;
            default:
                return false;
        }
    }
}

class RockTile extends Tile {
    constructor() {
        super();
    }
    name = "Rock";
    description = "Just a rock. Can only be removed by the attack of a Fire plant.";
    type = TileTypes.Rock;
    className = "rock-tile";
    score = 150;
    canRescore = true;
    clone = function() {
        var newTile = new RockTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new RockTile();
    }
    rescore = function() {
        if (this.canRescore) {
            return this.score;
        }
        return 0;
     
    }
}

class WaterTile extends Tile {
    constructor() {
        super();
    }
    name = "Water";
    description = "Waters tiles in a + pattern";
    type = TileTypes.Water;
    className = "water-tile";
    clone = function() {
        var newTile = new WaterTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new WaterTile();
    }
}

class SoilTile extends Tile {
    constructor() {
        super();
    }
    name = "Soil";
    description = "The Soil Tile is the base that all your plant's need to grow. Sow seeds, water and watch your plants florish.";
    type = TileTypes.Soil;
    wet = false;
    watered = true;
    sowed = false;
    sowedSeed = null;
    planted = false;
    plant = null;
    hasNestedTile = false;
    nestedTileType = TileTypes.None;
    className = "soil-tile";
    score = 0;
    clone = function() {
        var newTile = new SoilTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        if (this.planted) {
            return this.plant.attack();
        }
        return new SoilTile();
    }
    startGrowing = function() {
        this.tryGrowWeed();
    }
    finishGrowing = function() {
        this.drySoil();
    }
    tryGrowWeed = function() {
        if (!this.planted && !this.sowed) {
            var x = Math.floor(Math.random() * 35) + 1;
            if (x === 1) {
                this.growWeed();
            }
        }
    }
    growWeed = function() {
        this.planted = true;
        this.plant = new WeedTile();
        this.hasNestedTile = true;
        this.nestedTileType = this.plant.type;
    }
    waterSoil = function() {
        this.wet = true;
        this.watered = true;
        this.className = "soil-tile-wet";
        this.name = "Wet Soil"

        if (this.planted) {
            this.plant.waterPlant();
        } else if (this.sowed) {
            this.planted = true;
            this.plant = new PlantTile(this.sowedSeed)
            this.hasNestedTile = true;
            this.nestedTileType = this.plant.type;
        }
    }
    sowSoil = function(seed) {
        if (this.wet && !this.planted) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.plant = new PlantTile(this.sowedSeed);
            this.planted = true;
            this.nestedTileType = this.plant.type;
            this.hasNestedTile = true;

        } else if (!this.sowed) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.nestedTileType = seed.type;
            this.hasNestedTile = true;
        }
    }
    drySoil = function() {
        if (this.watered) {
            this.watered = false;
        } else if (this.wet) {
            this.wet = false;
            this.name = "Soil"
            this.className = "soil-tile";
        } else if (!this.watered && !this.wet && this.planted) {
            this.plant.wiltPlant();
        }
    }
    getNestedTile = function() {
        if (this.planted) {
            return this.plant;
        } else if (this.sowed) {
            return this.sowedSeed;
        }
    }
    nestedTileBeingAttacked = function(tile) {
        if (tile.type === TileTypes.Weed || tile.type === TileTypes.Plant) {
            this.planted = true;
            this.plant = tile;
            this.nestedTileType = tile.type;
            this.hasNestedTile = true;
        } else if (tile.type === TileTypes.Seed) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.nestedTileType = seed.type;
            this.hasNestedTile = true;
        }
    }
    tryPlaceTileOntop = function(tile) {
        const that = this;
        switch (tile.type) {
            case TileTypes.Water:
                that.waterSoil();
                return true;
                break;
            case TileTypes.Seed:
                if (!this.hasNestedTile) {
                    that.sowSoil(tile);
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    canAttack = function() {
        if (this.hasNestedTile)
            return this.getNestedTile().canAttack();
        else
            return false;
    }
    attack = function() {
        if (this.hasNestedTile && this.getNestedTile().canAttack())
            return this.getNestedTile().attack();
        else
            return null;
    }
    finishedAttacking() {
        this.plant.attacked = true;
    }
    getScore = function() {
        if (this.hasNestedTile)
            return this.getNestedTile().getScore();
        else
            return this.score;
    }
    rescore = function() {
        let score = 0;
        if (this.hasNestedTile) {
            score += this.getNestedTile().rescore();
        }
        this.canRescore = false;
        return score;
    }
    canReplaceTile = function(tile) {
        switch (tile.type) {
            case TileTypes.Rock:
                return !this.hasNestedTile;
            default:
                return false;
        }
    }
}

class SeedTile extends Tile {
    constructor(seedType = SeedTypes.None) {
        super();
        this.seedType = seedType;
        if (seedType != SeedTypes.None) {
            this.className += '-' + seedType.toLowerCase();
            this.name = seedType + ' ' + this.name;
        }
    }
    name = "Seed";
    description = "The Seed Tile will grow into Sprout when watered. Keep watering and you will end up with a Plant and score the Max Score for the tile. Will keep rescoring when watered at -25 points per water";
    type = TileTypes.Seed;
    seedType = SeedTypes;
    className = "seed-tile";
    score = 0;
    clone = function() {
        var newTile = new SeedTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new SeedTile();
    }
    getScore = function(){
        if (this.seedType != SeedTypes.None) {
            return 50;
        }
        return 100
    }
}

class PlantTile extends Tile {
    constructor(seed) {
        super();
        this.plantType = seed.seedType;
        this.lifeStatus = PlantLifeStatus.Sprout;
        this.name = "Sprout";
        if (seed.seedType != SeedTypes.None) {
            this.className += '-' + seed.seedType.toLowerCase();
            this.name = seed.seedType + " Sprout";
            this.score = 50;
            this.maxScore = 50;
        }
    }
    name = "Plant";
    description = "The end result of sowing a seed tile and watering it each turn, from a Sprout to a Plant.";
    type = TileTypes.Plant;
    plantType = SeedTypes;
    lifeStatus = PlantLifeStatus;
    statusBeforeWilt = null;
    className = "plant-tile-sprout";
    score = 100;
    maxScore = 100;
    attacked = false;
    clone = function() {
        var newTile = new PlantTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new PlantTile();
    }
    attack = function() {
        if (this.plantType === SeedTypes.Fire) {
            return {
                attack: function() { return new SoilTile() },
                targetType: TileTypes.All,
                nestedAttack: false,
                nestedTileType: null
            };
        }
    }
    canAttack = function() {
        return (this.plantType === SeedTypes.Fire && this.lifeStatus === PlantLifeStatus.FullyGrown && !this.attacked);
    }
    wiltPlant = function() {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sprout:
                this.statusBeforeWilt = this.lifeStatus;
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                break;
            case PlantLifeStatus.Budding:
                this.statusBeforeWilt = this.lifeStatus;
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                break;
            case PlantLifeStatus.FullyGrown:
                this.statusBeforeWilt = this.lifeStatus;
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = PlantLifeStatus.Dead;
                this.className = "dead-plant-tile";
                this.name = "Dead";
                break;
            default:
                return false;
        }
    }
    waterPlant = function() {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sprout:
                this.lifeStatus = PlantLifeStatus.Budding;
                if (this.plantType != SeedTypes.None) {
                    this.className = "plant-tile-budding-" + this.plantType.toLowerCase();
                    this.name = this.plantType + " Bud";
                } else {
                    this.className = "plant-tile-budding";
                    this.name = "Bud";
                }
                break;
            case PlantLifeStatus.Budding:
                this.lifeStatus = PlantLifeStatus.FullyGrown;
                this.canRescore = true;
                if (this.plantType != SeedTypes.None) {
                    this.className = "plant-tile-" + this.plantType.toLowerCase();
                    this.name = this.plantType + " Plant";
                } else {
                    this.className = "plant-tile";
                    this.name = "Plant";
                }
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = this.statusBeforeWilt;
                if (this.plantType != SeedTypes.None) {
                    if (this.lifeStatus === PlantLifeStatus.FullyGrown) {
                        this.maxScore - 25;
                        this.score = this.maxScore;
                        this.canRescore = true;
                        this.className = "plant-tile" + "-" + this.plantType.toLowerCase();
                    } else {
                        this.className = "plant-tile" + '-' + this.lifeStatus.toLowerCase() + "-" + this.plantType.toLowerCase();
                    }
                    this.name = this.plantType + " " + this.lifeStatus;
                    this.attacked = false;
                } else {
                    if (this.lifeStatus === PlantLifeStatus.FullyGrown) {
                        this.className = "plant-tile";
                        this.maxScore - 25;
                        this.score = this.maxScore;
                        this.canRescore = true;
                    } else {
                        this.className = "plant-tile" + '-' + this.lifeStatus;
                    }

                    this.name = this.lifeStatus;
                }
                break;
                case PlantLifeStatus.FullyGrown:
                this.maxScore -= 25;
                this.score = this.maxScore;
                this.canRescore = true;
            default:
                return false;
        }
    }
    rescore = function() {
        if (this.canRescore && this.score > 0) {
            return this.score;
        }
        return 0;
    }
   
}

class WeedTile extends Tile {
    constructor() {
        super();
        this.lifeStatus = WeedLifeStatus.Sprout;
        this.name = "Weed Sprout";
    }
    name = "Weed";
    description = "A pesky little plant that will randomly sprout in empty Soil Tiles. When fully grown it will have a high chance of spreading into adjacent tiles.";
    type = TileTypes.Weed;
    plantType = SeedTypes.Weed;
    lifeStatus = WeedLifeStatus;
    className = "weed-tile-sprout";
    score = 0;
    clone = function() {
        var newTile = new WeedTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function() {
        return new WeedTile();
    }
    attack = function() {
        return {
            attack: function() { return new WeedTile() },
            targetType: TileTypes.Soil,
            nestedAttack: true,
            nestedTileType: TileTypes.None
        }
    }
    canAttack = function() {
        return this.lifeStatus === WeedLifeStatus.FullyGrown;
    }
    wiltPlant = function() {
        switch (this.lifeStatus) {
            case WeedLifeStatus.FullyGrown:
                this.lifeStatus = WeedLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                this.score = 0;
                break;
            case WeedLifeStatus.Wilted:
                this.lifeStatus = WeedLifeStatus.Dead;
                this.className = "dead-plant-tile";
                this.name = "Dead";
                this.score = 0;
                break;
            default:
                this.waterPlant();
        }
    }
    waterPlant = function() {
        switch (this.lifeStatus) {
            case WeedLifeStatus.Sprout:
                this.lifeStatus = WeedLifeStatus.Seedling;
                this.className = "weed-tile-seedling";
                this.name = "Weed seedling";
                break;
            case WeedLifeStatus.Seedling:
                this.lifeStatus = WeedLifeStatus.Budding;
                this.className = "weed-tile-budding";
                this.name = "Weed Bud";
                break;
            case WeedLifeStatus.Budding:
                this.lifeStatus = WeedLifeStatus.FullyGrown;
                this.className = "weed-tile-fullyGrown";
                this.name = "Weed";
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = WeedLifeStatus.FullyGrown;
                this.className = "weed-tile-fullyGrown";
                this.name = "Weed";
                break;
            default:
                return false;
        }
    }
}

export { Tile, EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, RockTile, WeedTile };