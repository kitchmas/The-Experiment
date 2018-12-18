const TileTypes = {
    All: "all",
    None: "none",
    Soil: "soil",
    Seed: "seed",
    Water: "water",
    WetSoil: "wetSoil",
    SoilSeed: "soilSeed",
    SoilSeed: "soilSeed",
    Sapling: "sapling",
    Plant: "plant",
    Weed: "weed",
    Rock:"rock"
};

const PlantLifeStatus = {
    Sapling: "sapling",
    FullyGrown: "fullyGrown",
    WillWilt: "willWilt",
    Wilted: "wilted",
    Dead: "dead"
};

const WeedLifeStatus = {
    Sprout: "sprout",
    Seedling: "seedling",
    Budding: "budding",
    FullyGrown: "fullyGrown"
};

const SeedTypes = {
    None: "none",
    Fire: "fire",
    Water: "water",
    willDie: "willDie",
    Weed:"weed"
};



export { TileTypes, PlantLifeStatus, SeedTypes, WeedLifeStatus };