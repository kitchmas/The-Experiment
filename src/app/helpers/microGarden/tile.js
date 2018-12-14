import { TileTypes, SeedTypes } from "../../components/board-game/tile-enums";

class Tile {
    name = "Tile"
    description = "A Simple empty tile. Dose nothing special";
    type = TileTypes.None;
    className = "empty-tile";
    getInstance = () => {
        return new Tile();
    }
    canTransForm(type) {
        return false;
    }
    placeTileOntop = (tile) => {
        switch (tile.type) {
            case TileTypes.Water:
                this.waterSoil();
                break;
            case TileTypes.Seed:
                this.sowSoild(tile);
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
    sowed = false;
    sowedSeed = null;
    planted = false;
    plant = null;
    className = "soil-tile"
    getInstance = () => {
        return new SoilTile();
    }
    waterSoil = () => {
        if (this.sowed) {
            this.planted = true;
            //this plant = new Plant(this.sowedSeed)
        } else {
            this.wet = true;
            this.className = "wet-soil-tile"
        }
    }
    sowSoil = (seed) => {
        if (this.wet) {
            this.sowed = true;
            this.sowedSeed = seed;
            this.planted = true;
            //this plant = new Plant(this.sowedSeed)
        } else {
            this.sowed = true;
            this.sowedSeed = seed;
            this.className = "sowed-soil-tile"
        }
    }
    placeTileOntop = (tile) => {
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
        this.plantType = this.seed.SeedTypes;
    }
    getInstance = () => {
        return new PlantTile();
    }
    name = "Plant";
    description = "Sows soild with seeds in a + pattern";
    type = TileTypes.Plant;
    plantType = SeedTypes;
    className = "plantTile"
    attack = () => {
        //Attack
    }
    wiltPlant = () => {

    }
    waterPlant = () => {

    }
}

export { Tile, WaterTile, SoilTile, SeedTile, PlantTile };

