import {TileTypes, TileStatus, TileEffects} from '../board-game/tile-enums.js'; 

class Tile {
    constructor(type = TileTypes.None, status = TileStatus.None, effect = TileEffects.None){
        this.type = type;
        this.status = status;
        this.effect = effect;
    }
    type = TileTypes;
    status = TileStatus;
    effect = TileEffects;
}

export default Tile;

