import { TileTypes, SeedTypes, PlantLifeStatus, WeedLifeStatus } from "../../components/board-game/tile-enums";

class Tile {
    name = "Tile"
    description = "A Tile";
    type = TileTypes.None;
    className = "tile";
    score = 0;
    canRescore = false;
    clone = function () {
        var newTile = new Tile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new Tile();
    }
    canReplaceTile = function (tile) {
        return false;
    }
    tryPlaceTileOntop = function (tile) {
        return false;
    }
    startGrowing = function () {
        return;
    }
    finishGrowing = function () {
        return;
    }
    canAttack = function () {
        return false;
    }
    attack = function () {
        return flase;
    }
    rescore = function(){
        return 0;
    }
    getScore = function () {
        return this.score;
    }
}

class EmptyTile extends Tile {
    constructor() {
        super();
    }
    name = "Tile"
    description = "A Simple empty tile. Dose nothing special";
    type = TileTypes.None;
    className = "empty-tile";
    score = 0;
    clone = function () {
        var newTile = new EmptyTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new EmptyTile();
    }
    canReplaceTile = function (tile) {
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
    handleAttack = function (attack) {
        if (attack.effectedTiles === TileTypes.All && !nestedAttack) {
            return attack.attack();
        }
    }
  
}

class RockTile extends Tile {
    constructor() {
        super();
    }
    name = "Rock";
    description = "Tile that can be moved by an attacking plant";
    type = TileTypes.Rock;
    className = "rock-tile";
    score = 0;
    clone = function () {
        var newTile = new RockTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new RockTile();
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
    clone = function () {
        var newTile = new WaterTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new WaterTile();
    }
}

class SoilTile extends Tile {
    constructor() {
        super();
    }
    name = "Soil";
    description = "Fills tiles in a + pattern with soil";
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
    score = 10;
    clone = function () {
        var newTile = new SoilTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        if (this.planted) {
            return this.plant.attack();
        }
        return new SoilTile();
    }
    startGrowing = function () {
        this.tryGrowWeed();
    }
    finishGrowing = function () {
        this.drySoil();
    }
    tryGrowWeed = function () {
        if (!this.planted && !this.sowed) {
            if ((Math.floor(Math.random() * 6) + 1) === 1) {
                this.growWeed();
            }
        }
    }
    growWeed = function () {
        this.planted = true;
        this.plant = new WeedTile();
        this.hasNestedTile = true;
        this.nestedTileType = this.plant.type;
    }
    waterSoil = function () {
        this.wet = true;
        this.watered = true;
        this.className = "wet-soil-tile";

        if (this.planted) {
            this.plant.waterPlant();
        } else if (this.sowed) {
            this.planted = true;
            this.plant = new PlantTile(this.sowedSeed)
            this.className = "wet-soil-tile";
            this.hasNestedTile = true;
            this.nestedTileType = this.plant.type;
        }
    }
    sowSoil = function (seed) {
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
    drySoil = function () {
        if (this.watered) {
            this.watered = false;
        } else if (this.wet) {
            this.wet = false;
            // hmmm should be done using the wet flag
            this.className = "soil-tile";
        } else if (!this.watered && !this.wet && this.planted) {
            this.plant.wiltPlant();
        }
    }
    getNestedTile = function () {
        if (this.planted) {
            return this.plant;
        } else if (this.sowed) {
            return this.sowedSeed;
        }
    }
    nestedTileBeingAttacked = function (tile) {
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
    tryPlaceTileOntop = function (tile) {
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
                }
                else {
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    canAttack = function () {
        if (this.hasNestedTile)
            return this.getNestedTile().canAttack();
        else
            return false;
    }
    attack = function () {
        if (this.hasNestedTile && this.getNestedTile().canAttack())
            return this.getNestedTile().attack();
        else
            return null;
    }
    getScore = function() {
        if (this.hasNestedTile)
            return this.getNestedTile().getScore();
        else
            return this.score;
    }
    rescore = function(){
        debugger;
        let score = 0;
        if(this.canRescore){
           score += this.score;
        }
        if(this.hasNestedTile){
          score +=  this.getNestedTile().rescore();
        }
        this.canRescore = false;
        return score;
    }
}

class SeedTile extends Tile {
    constructor(seedType = SeedTypes.None) {
        super();
        this.seedType = seedType;
        if (seedType != SeedTypes.None) {
            this.className += '-' + seedType;
            this.name += ' ' + seedType;
        }
    }
    name = "Seed";
    description = "Sows soil with seeds in a + pattern";
    type = TileTypes.Seed;
    seedType = SeedTypes;
    className = "seed-tile";
    score = 20;
    clone = function () {
        var newTile = new SeedTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new SeedTile();
    }
}

class PlantTile extends Tile {
    constructor(seed) {
        super();
        this.plantType = seed.seedType;
        this.lifeStatus = PlantLifeStatus.Sprout;
        this.name = "Sprout";
        if (seed.seedType != SeedTypes.None) {
            this.className += this.className += '-' + seed.seedType;
        }
    }
    clone = function () {
        var newTile = new PlantTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new PlantTile();
    }
    name = "Plant";
    description = "Sows soild with seeds in a + pattern";
    type = TileTypes.Plant;
    plantType = SeedTypes;
    lifeStatus = PlantLifeStatus;
    statusBeforeWilt = null;
    className = "plant-tile-sprout";
    score = 10;
    maxScore = 100;
    canRescore = false;
    attack = function () {
        if (this.plantType === SeedTypes.Fire) {
            return {
                attack: function () { return new EmptyTile() },
                targetType: TileTypes.All,
                nestedAttack: false,
                nestedTileType: null
            };
        }
    }
    canAttack = function () {
        return (this.plantType === SeedTypes.Fire && this.lifeStatus === PlantLifeStatus.FullyGrown);
    }
    wiltPlant = function () {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sprout:
                this.statusBeforeWilt = this.lifeStatus;
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                this.score = 0;
                break;
            case PlantLifeStatus.Budding:
                this.statusBeforeWilt = this.lifeStatus;
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                this.score = 0;
                break;    
            case PlantLifeStatus.FullyGrown:
                 this.statusBeforeWilt = this.lifeStatus;
                 this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                this.score = 0;
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = PlantLifeStatus.Dead;
                this.className = "dead-plant-tile";
                this.name = "dead";
                this.score = 0;
                break;
            default:
                return false;
        }
    }
    waterPlant = function () {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sprout:
                this.lifeStatus = PlantLifeStatus.Budding;
                this.className = "plant-tile-budding";
                this.name = "budding";
                if(this.plantType === SeedTypes.None){
                this.score = 20;
                this.canRescore = true;
                }
                break;
            case PlantLifeStatus.Budding:
                this.lifeStatus = PlantLifeStatus.FullyGrown;
                this.className = "plant-tile";
                this.name = "plant";
                if(this.plantType === SeedTypes.None){
                this.score = this.maxScore;
                this.canRescore = true;
                }
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = this.statusBeforeWilt;
                this.className = ("plant-tile" + '-' + this.lifeStatus);
                this.name = this.lifeStatus;
                if(this.plantType === SeedTypes.None && this.lifeStatus === PlantLifeStatus.FullyGrown){
                this.maxScore -25;
                this.score = this.maxScore;
                this.canRescore = true;
                }
                break;
            default:
                return false;
        }
    }
    rescore = function(){
        if(this.canRescore){
            this.canRescore = false;
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
    clone = function () {
        var newTile = new WeedTile();
        for (var key in newTile) {
            newTile[key] = this[key];
        }
        return newTile;
    }
    getInstance = function () {
        return new WeedTile();
    }
    name = "Weed";
    description = "Grows slower than a plant and spreads into adjacent tiles";
    type = TileTypes.Weed;
    plantType = SeedTypes.Weed;
    lifeStatus = WeedLifeStatus;
    className = "weed-tile-sprout";
    score = -10;
    attack = function () {
        return {
            attack: function () { return new WeedTile() },
            targetType: TileTypes.Soil,
            nestedAttack: true,
            nestedTileType: TileTypes.None
        }
    }
    canAttack = function () {
        return this.lifeStatus === WeedLifeStatus.FullyGrown;
    }
    wiltPlant = function () {
        this.waterPlant();
    }
    waterPlant = function () {
        switch (this.lifeStatus) {
            case WeedLifeStatus.Sprout:
                this.lifeStatus = WeedLifeStatus.Seedling;
                this.className = "weed-tile-seedling";
                this.name = "Weed seedling";
                break;
            case WeedLifeStatus.Seedling:
                this.lifeStatus = WeedLifeStatus.Budding;
                this.className = "weed-tile-budding";
                this.name = "Weed budding";
                break;
            case WeedLifeStatus.Budding:
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