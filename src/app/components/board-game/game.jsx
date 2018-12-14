import React from 'react';

import Board from '../board-game/board.jsx';
import shuffle from '../../helpers/shuffle';
import { Tile, WaterTile, SoilTile, SeedTile, PlantTile } from '../../helpers/microGarden/tile.js';

// import Tile from '../board-game/tile.js'; 
import { TileTypes, TileStatus, TileEffects } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        tiles: [Array(3).fill(new Tile()), Array(3).fill(new Tile()), Array(3).fill(new Tile())],
        // tiles: [[{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }]],
        selectedCell: null,
        tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile()],
    }
    componentWillMount = () => {
        this.turnSetup();
    }
    turnSetup = () => {

        // var tiles = this.state.tiles.slice();


        // // this.checkForThreeOfAkind();
        // tiles = this.wiltPlants(tiles);

        // tiles = this.plantsAttack(tiles);
        // this.setState({
        //     selectedCell: null,
        //     tiles:tiles
        // });

        this.drawNextTile();
    }
    drawNextTile = () => {
        this.setState({
            tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile()]
        });
    }
    // transformAdjacentTiles = (type) => {
    //     let selectedCellIndex = this.state.selectedCell,
    //         tilesCopy = this.state.tiles.slice(),
    //         oneOrMoreTilesConverted = false;


    //     switch (type) {
    //         case "water":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "vapour") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "lava", "obsidian") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "earth", "sand") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "water") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "fire":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "vapour") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "water") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "fire") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "glass") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "fire") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "ice":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "ice") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "earth") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "water") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "ice") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "wood":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "wood") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "sand":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "glass") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "sand") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "glass":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "glass") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "earth":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "sand") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "earth") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "lava":
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "obsidian") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava") ? oneOrMoreTilesConverted = true : null;
    //             this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "lava") ? oneOrMoreTilesConverted = true : null;
    //             break;
    //         case "plant":
    //             break;
    //         default:
    //     }
    transformAdjacentTiles = (tile) => {
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice();


        let tryTransformTile = (indexArr) => {
            if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)
               ) {
                let tileToChange =  tilesCopy[indexArr[0]][indexArr[1]];
                if (tileToChange.type === TileTypes.None && tile.type !== TileTypes.Water) {
                    tilesCopy[indexArr[0]][indexArr[1]] = tile.getInstance();
                } else{
                    tileToChange.placeTileOntop(tile);
                }
            }
        };

        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1]]);
        tryTransformTile([selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] - 1]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] + 1]);
        tryTransformTile([selectedCellIndex[0] + 1, selectedCellIndex[1]]);


        this.setState({
            tiles: tilesCopy,
        });

    }
    wiltPlants = (tiles) => {
        tiles = tiles.map(row => {
            return row.map(tile => {
                if (tile.type === "wiltedPlant" && tile.status === null) {
                    let newTile = Object.assign({}, tile);
                    newTile.status = "willDie";
                    tile = newTile;
                } else if (tile.type === "wiltedPlant" && tile.status === "willDie") {
                    let newTile = Object.assign({}, tile);
                    newTile.status = null;
                    newTile.type = "deadPlant"
                    tile = newTile;
                }
                // Probably a plant that is wilted and watered has a status of willDie need a better fix
                if ((tile.type === "plant" && tile.status === null) || (tile.type === "plant" && tile.status === "willDie")) {
                    let newTile = Object.assign({}, tile);
                    newTile.status = "willWilt";
                    tile = newTile;
                } else if (tile.type === "plant" && tile.status === "willWilt") {
                    let newTile = Object.assign({}, tile);
                    newTile.status = null;
                    newTile.type = "wiltedPlant",
                        newTile.effect = null,
                        tile = newTile;
                }
                return tile;
            });
        });
        return tiles;
    }
    plantsAttack = (tiles) => {
        tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (tile.type === "plant" && tile.effect === "fire") {
                    this.tryAndConvertAdjacentTiles(tiles, [rowIndex, tileIndex], "all", null);
                }
            });
        });
        return tiles;
    }
    cellClicked = (index) => {
            this.setState({
                selectedCell: index
            })
    }
    newTileClicked = (tile, e) => {
        // Tile is now and object
        e.stopPropagation();
        this.transformAdjacentTiles(tile)

        this.turnSetup();
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <Board tiles={this.state.tiles}
                    cellClicked={this.cellClicked}
                    newTileClicked={this.newTileClicked}
                    selectedCell={this.state.selectedCell}
                    tileBagContent={this.state.tileBagContent}
                />
            </div>
        )
    }
}

export default Game