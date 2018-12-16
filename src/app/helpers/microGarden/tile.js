import { TileTypes, SeedTypes, PlantLifeStatus } from "../../components/board-game/tile-enums";

class Tile {
    name = "Tile"
    description = "A Tile";
    type = TileTypes.None;
    className = "tile";
    getInstance = () => {
        return new Tile();
    }
    canReplaceTile = (tile) => {
        return false;
    }
    tryPlaceTileOntop = (tile) => {
        return false;
    }
}

class EmptyTile extends Tile {
    name = "Tile"
    description = "A Simple empty tile. Dose nothing special";
    type = TileTypes.None;
    className = "empty-tile";
    getInstance = () => {
        return new EmptyTile();
    }
    canReplaceTile = (tile) => {
        switch (tile.type) {
            case TileTypes.Soil:
                return true;
                break;
            default:
                return false;
        }
    }
}

class WaterTile extends Tile {
    name = "Water";
    description = "Waters tiles in a + pattern";
    type = TileTypes.Water;
    className = "water-tile"
    getInstance = () => {
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

    getInstance = () => {
        return new SoilTile();
    }
    waterSoil = () => {
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
    sowSoil = (seed) => {
        if (this.wet) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.plant = new PlantTile(this.sowedSeed)
            this.planted = true;
            this.hasNestedTile = true;

        } else {
            this.sowed = true;
            this.sowedSeed = seed;
            this.hasNestedTile = true;
        }
    }
    drySoil = () => {
        debugger;
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
    getNestedChild = () => {
        if (this.planted) {
            return this.plant;
        } else if (this.sowed) {
            return this.sowedSeed;
        }
    }
    tryPlaceTileOntop = (tile) => {
        const that = this;
        switch (tile.type) {
            case TileTypes.Water:
                that.waterSoil();
                break;
            case TileTypes.Seed:
                that.sowSoil(tile);
                break;
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
            this.className += '-' + seedType;
        }
    }
    getInstance = () => {
        return new SeedTile();
    }
    name = "Seed";
    description = "Sows soil with seeds in a + pattern";
    type = TileTypes.Seed;
    seedType = SeedTypes;
    className = "seed-tile"
}

class PlantTile extends Tile {
    constructor(seed) {
        super();
        this.plantType = seed.SeedType;
        this.lifeStatus = PlantLifeStatus.Sapling;
        this.name = "Sapling";
        if (seed.seedType != SeedTypes.None) {
            this.className += this.className += '-' + seed.seedType;
        }
    }
    getInstance = () => {
        return new PlantTile();
    }
    name = "Plant";
    description = "Sows soild with seeds in a + pattern";
    type = TileTypes.Plant;
    plantType = SeedTypes;
    lifeStatus = PlantLifeStatus;
    className = "plant-tile-sapling "
    attack = () => {

    }
    wiltPlant = () => {
        debugger;
        if (this.lifeStatus === PlantLifeStatus.Dead)
            return;
        else if (this.lifeStatus === PlantLifeStatus.Sapling) {
            this.lifeStatus = PlantLifeStatus.Dead;
            this.className = "dead-plant-tile";
            this.name = "Dead";
        } else if (this.lifeStatus === PlantLifeStatus.FullyGrown) {
            this.lifeStatus = PlantLifeStatus.Wilted;
            this.className = "wilted-plant-tile";
            this.name = "Wilted";
        } else if (this.lifeStatus === PlantLifeStatus.Wilted) {
            this.lifeStatus = PlantLifeStatus.Dead;
            this.className = "dead-plant-tile";
            this.name = "dead";
        }
    }
    waterPlant = () => {
        debugger;
        if (this.lifeStatus === PlantLifeStatus.Sapling) {
            this.lifeStatus = PlantLifeStatus.FullyGrown;
            this.className = "plant-tile";
            this.name = "plant";
        } else if (this.lifeStatus === PlantLifeStatus.Wilted) {
            this.lifeStatus = PlantLifeStatus.FullyGrown;
            this.className = "plant-tile";
            this.name = "plant";
        }
    }
}

export { Tile, EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile };