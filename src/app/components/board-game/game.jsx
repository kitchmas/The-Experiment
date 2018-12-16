import React from 'react';

import Board from '../board-game/board.jsx';
import shuffle from '../../helpers/shuffle';
import { EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile } from '../../helpers/microGarden/tile.js';

// import Tile from '../board-game/tile.js'; 
import { TileTypes, TileStatus, TileEffects } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        tiles: [Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile())],
        selectedCell: null,
        tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile()],
    }
    componentWillMount = () => {
        this.turnSetup();
    }
    turnSetup = () => {
        this.setState({
            selectedCell: null
        });

        this.wiltPlants();

        this.drawNextTile();
    }
    drawNextTile = () => {
        this.setState({
            tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile()]
        });
    }
    transformAdjacentTiles = (tile) => {
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice();

        let tryTransformTile = (indexArr) => {
            //Check if the passed index actualy exists before trying to converting the tile in the position
            if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)) {
                let tileToChange = tilesCopy[indexArr[0]][indexArr[1]];
                if (tile)
                    if (tileToChange.canReplaceTile(tile)) {
                        tilesCopy[indexArr[0]][indexArr[1]] = tile.getInstance();
                    } else {
                        tileToChange.tryPlaceTileOntop(tile)
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
    wiltPlants = () => {
        let tiles = this.state.tiles.slice();
        tiles = tiles.map(row => {
            return row.map(tile => {
                if (tile.type === TileTypes.Soil) {
                    tile.drySoil();
                }
            });
        });


                //     let newTile = Object.assign({}, tile);
                //     newTile.status = "willDie";
                //     tile = newTile;
                // } else if (tile.type === "wiltedPlant" && tile.status === "willDie") {
                //     let newTile = Object.assign({}, tile);
                //     newTile.status = null;
                //     newTile.type = "deadPlant"
                //     tile = newTile;
                // }
                // // Probably a plant that is wilted and watered has a status of willDie need a better fix
                // if ((tile.type === "plant" && tile.status === null) || (tile.type === "plant" && tile.status === "willDie")) {
                //     let newTile = Object.assign({}, tile);
                //     newTile.status = "willWilt";
                //     tile = newTile;
                // } else if (tile.type === "plant" && tile.status === "willWilt") {
                //     let newTile = Object.assign({}, tile);
                //     newTile.status = null;
                //     newTile.type = "wiltedPlant",
                //         newTile.effect = null,
                //         tile = newTile;
                // }
                // return tile;
            // });
        // });
        // return tiles;
    }
    plantsAttack = () => {
        let tiles = this.state.tiles.slice();
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