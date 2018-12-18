import { TileTypes, SeedTypes, PlantLifeStatus, WeedLifeStatus } from "../../components/board-game/tile-enums";

class Tile {
    name = "Tile"
    description = "A Tile";
    type = TileTypes.None;
    className = "tile";
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
        if (tile.type === TileTypes.Soil && tile.planted && tile.plant.canAttack()) {
            return true;
        }
        return false;
    }
    tryPlaceTileOntop = function (tile) {
        return false;
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
    type = TileTypes.Water;
    className = "rock-tile";
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
    className = "soil-tile";
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
    age = function () {
        this.drySoil();
        this.tryGrowWeed();
    }
    tryGrowWeed = function () {
        if (!this.planted && !this.sowed) {
            if ((Math.floor(Math.random() * 3) + 1) === 1) {
                this.growWeed();
            }
        }
    }
    growWeed = function () {
        this.planted = true;
        this.plant = new WeedTile();
        this.hasNestedTile = true;
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
        }
    }
    sowSoil = function (seed) {
        if (this.wet && !this.planted) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.plant = new PlantTile(this.sowedSeed);
            this.planted = true;
            this.hasNestedTile = true;

        } else if (!this.sowed) {
            this.sowed = true;
            this.sowedSeed = seed;
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
    getNestedChild = function () {
        if (this.planted) {
            return this.plant;
        } else if (this.sowed) {
            return this.sowedSeed;
        }
    }
    tryPlaceTileOntop = function (tile) {
        const that = this;
        switch (tile.type) {
            case TileTypes.Water:
                that.waterSoil();
                break;
            case TileTypes.Seed:
                that.sowSoil(tile);
                break;
            case TileTypes.Soil:
                if (tile.planted && tile.plant.type === SeedTypes.Weed && !this.planted)
                    this.growWeed();
                break;
            default:
                return false;
        }
    }
    handleAttack = function (attack) {
        if (attack.effectedTiles === TileTypes.All && !nestedAttack) {
            return attack.attack();
        } else if (attack.effectedTiles === TileTypes.Soil && !attack.nestedAttack) {
            return attack.attack();
        } else if (attack.effectedTiles === TileTypes.Soil && attack.nestedAttack) {
            if (attack.nestedEffectedTileType === TileTypes.None && !this.hasNestedTile) {
                this.nested = true;
                this.planted = true;
                this.plant = attack.attack();
                return this;
            } else if (this.hasNestedTile && (attack.nestedEffectedTileType === TileTypes.All || attack.nestedEffectedTileType === this.Plant.type)) {
                this.plant = attack.attack();
                return this;
            }
        }
    }
}

class SeedTile extends Tile {
    constructor(seedType = SeedTypes.None) {
        super();
        this.seedType = seedType;
        if (seedType != SeedTypes.None) {
            this.className += '-' + seedType;
        }
    }
    name = "Seed";
    description = "Sows soil with seeds in a + pattern";
    type = TileTypes.Seed;
    seedType = SeedTypes;
    className = "seed-tile"
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
        this.lifeStatus = PlantLifeStatus.Sapling;
        this.name = "Sapling";
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
    className = "plant-tile-sapling "
    attack = function () {
        if (plantType === SeedTypes.Fire()) {
            return {
                attack: function () { return new EmptyTile() },
                effectedTiles: TileTypes.All,
                nestedAttack: false
            };
        }
    }
    canAttack = function () {
        return (this.plantType === SeedTypes.Fire && this.lifeStatus === PlantLifeStatus.FullyGrown);
    }
    wiltPlant = function () {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sapling:
                this.lifeStatus = PlantLifeStatus.Dead;
                this.className = "dead-plant-tile";
                this.name = "Dead";
                break;
            case PlantLifeStatus.FullyGrown:
                this.lifeStatus = PlantLifeStatus.Wilted;
                this.className = "wilted-plant-tile";
                this.name = "Wilted";
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = PlantLifeStatus.Dead;
                this.className = "dead-plant-tile";
                this.name = "dead";
                break;
            default:
                return false;
        }
    }
    waterPlant = function () {
        switch (this.lifeStatus) {
            case PlantLifeStatus.Sapling:
                this.lifeStatus = PlantLifeStatus.FullyGrown;
                this.className = "plant-tile";
                this.name = "plant";
                break;
            case PlantLifeStatus.Wilted:
                this.lifeStatus = PlantLifeStatus.FullyGrown;
                this.className = "plant-tile";
                this.name = "plant";
                break;
            default:
                return false;
        }
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
    className = "weed-tile-sappling"
    attack = function () {
        return {
            attack: function () { return new Weed() },
            effectedTiles: TileTypes.Soil,
            nestedAttack: true,
            nestedEffectedTileType: TileTypes.None
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

export { Tile, EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, RockTile };