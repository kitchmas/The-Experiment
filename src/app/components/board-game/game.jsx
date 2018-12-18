import React from 'react';

import cloneDeep from 'lodash.clonedeep';

import Board from '../board-game/board.jsx';
import { EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, Tile, RockTile } from '../../helpers/microGarden/tile.js';

import { TileTypes, TileStatus, TileEffects, SeedTypes, PlantLifeStatus } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        turnConfirmed: true,
        tiles: [Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile())],
        selectedCellIndex: null,
        tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile(SeedTypes.Fire)],
    }
    componentWillMount = () => {
        this.turnSetup();
    }
    turnSetup = () => {
        let tiles = cloneDeep(this.state.tiles);

        this.ageTiles(tiles);
        this.plantsAttack(tiles);

        this.setState({
            tiles: tiles,
            previousTurn: tiles,
            selectedCellIndex: null
        }, this.drawNextTile());

    }
    drawNextTile = () => {
        this.setState({
            tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile(SeedTypes.Fire)]
        });
    }
    tryTransformTile = (tilesCopy, indexArr, tile,attacking) => {
        if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
            (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)) {

            // probably not working as it should but can't get a deep clone working
            let tileToChange = tilesCopy[indexArr[0]][indexArr[1]];
            let tileToChange2 = tileToChange.clone();
                if(attacking){
                    tilesCopy[indexArr[0]][indexArr[1]] = tileToChange2.handleAttack(tile.attack()).clone;
                }
                else if (tileToChange2.canReplaceTile(tile)) {
                    tilesCopy[indexArr[0]][indexArr[1]] = tile.getInstance();
                } else {
                    tileToChange2.tryPlaceTileOntop(tile);
                    tilesCopy[indexArr[0]][indexArr[1]] = tileToChange2;
        }
    }
}
  
    placeTile = (tilesCopy, tile) => {
        let selectedCellIndex = this.state.selectedCellIndex;
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1]], tile);
    }
    transformAdjacentTiles = (tilesCopy, tile, selectedCellIndex,attacking) => {
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0] - 1, selectedCellIndex[1]], tile,attacking);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] - 1], tile,attacking);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] + 1], tile,attacking);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0] + 1, selectedCellIndex[1]], tile,attacking);
    }
    ageTiles = (tiles) => {
        tiles.map(row => {
            return row.map(tile => {
                debugger;
                if (tile.type === TileTypes.Soil) {
                    tile.age();
                }
            });
        });
    }
    plantsAttack = (tiles) => {
        tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (tile.type === TileTypes.Soil && tile.planted && tile.plant.canAttack()) {
                    this.transformAdjacentTiles(tiles, tile, [rowIndex, tileIndex],true);
                }
            });
        });
    }
    cellClicked = (index) => {
        this.setState({
            selectedCellIndex: index
        })
    }
    newTileClicked = (tile, e) => {
        if (!this.state.turnConfirmed)
            return;
        let tilesCopy = cloneDeep(this.state.tiles);
        e.stopPropagation();
        this.placeTile(tilesCopy, tile);
        this.transformAdjacentTiles(tilesCopy, tile, this.state.selectedCellIndex);

        this.setState({
            tiles: tilesCopy,
            selectedCellIndex: null,
            turnConfirmed: false
        });
    }
    confirm = () => {
        this.setState({ turnConfirmed: true }, this.turnSetup());
    }
    goBack = () => {
        if (!this.state.turnConfirmed)
            this.setState((prevState) => ({
                tiles: prevState.previousTurn,
                turnConfirmed: true
            }));
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <div>
                    {!this.state.turnConfirmed ? <button onClick={this.confirm}>Confirm</button> : null}
                    {!this.state.turnConfirmed ? <button onClick={this.goBack}>Back</button> : null}
                    <Board tiles={this.state.tiles}
                        cellClicked={this.cellClicked}
                        newTileClicked={this.newTileClicked}
                        selectedCellIndex={this.state.selectedCellIndex}
                        tileBagContent={this.state.tileBagContent}
                        turnConfirmed={this.state.turnConfirmed}
                    />
                </div>
            </div>
        )
    }
}

export default Game