import React from 'react';

import cloneDeep from 'lodash.clonedeep';

import Board from '../board-game/board.jsx';
import TileBag from '../board-game/tile-bag.jsx';
import BoardGameHelp from '../board-game/board-game-help.jsx';

import { EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, Tile, RockTile, WeedTile } from '../../helpers/microGarden/tile.js';
import shuffle from '../../helpers/shuffle.js';

import { TileTypes, TileStatus, TileEffects, SeedTypes, PlantLifeStatus } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        turnConfirmed: true,
        tiles: [Array(5).fill(new EmptyTile()), Array(5).fill(new EmptyTile()), Array(5).fill(new EmptyTile()), Array(5).fill(new EmptyTile()), Array(5).fill(new EmptyTile())],
        selectedCellIndex: null,
        tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile()],
        score: 0,
        previousScore: 0,
        tilesChanged: false
    }
    componentWillMount = () => {
        this.turnSetup();
        let tiles = cloneDeep(this.state.tiles);

        this.setState({
            tiles: tiles,
        });

    }
    turnSetup = () => {
        let tiles = cloneDeep(this.state.tiles),
            tileBagContent = [new WaterTile(), new SoilTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)];

        this.startGrowing(tiles);

        this.setState({
            tiles: tiles,
            previousTurn: tiles,
            selectedCellIndex: null,
            tileBagContent: tileBagContent
        }, this.drawNextTile());

    }
    drawNextTile = () => {
        this.setState({
            tileBagContent: [new WaterTile(), new SoilTile(), new SeedTile(SeedTypes.Fire)]
        });
    }
    tryTransformTile = (tilesCopy, indexArr, tile, attacking, tileChanged) => {
        if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
            (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)) {

            // probably not working as it should but can't get a deep clone working
            let tileToChange = tilesCopy[indexArr[0]][indexArr[1]];
            tileToChange = tileToChange.clone();
            if (attacking && tile.canAttack()) {
                let attack = tile.attack();
                if (attack.targetType === tileToChange.type || attack.targetType === TileTypes.All) {
                    if (!attack.nestedAttack) {
                        tilesCopy[indexArr[0]][indexArr[1]] = attack.attack();
                        if (tileChanged)
                            tileChanged.changed = true;
                    } else if (attack.nestedTileType === tileToChange.nestedTileType || attack.nestedTileType === TileTypes.All) {
                        tileToChange.nestedTileBeingAttacked(attack.attack());
                        tilesCopy[indexArr[0]][indexArr[1]] = tileToChange;
                        if (tileChanged)
                            tileChanged.changed = true;
                    }
                }
            }
            else if (tileToChange.canReplaceTile(tile)) {
                tilesCopy[indexArr[0]][indexArr[1]] = tile.getInstance();
                if (tileChanged)
                    tileChanged.changed = true;
            } else {
                if (tileToChange.tryPlaceTileOntop(tile)) {
                    tilesCopy[indexArr[0]][indexArr[1]] = tileToChange;
                    if (tileChanged)
                        tileChanged.changed = true;
                }
            }
        }
    }
    highlightCell = (tilesCopy, indexArr, tile, attacking, tileChanged) => {
        if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
            (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)) {

            let tileToChange = tilesCopy[indexArr[0]][indexArr[1]];
            tileToChange = tileToChange.clone();
            tileToChange.selected = tileToChange.selected ? false : true;

            tilesCopy[indexArr[0]][indexArr[1]] = tileToChange;
        }
    }

    placeTile = (tilesCopy, tile, tileChanged) => {
        let selectedCellIndex = this.state.selectedCellIndex;
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1]], tile, false, tileChanged);
    }
    transformAdjacentTiles = (tilesCopy, tile, selectedCellIndex, attacked, tileChanged) => {
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0] - 1, selectedCellIndex[1]], tile, attacked, tileChanged);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] - 1], tile, attacked, tileChanged);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] + 1], tile, attacked, tileChanged);
        this.tryTransformTile(tilesCopy, [selectedCellIndex[0] + 1, selectedCellIndex[1]], tile, attacked, tileChanged);
    }
    highlightAdjacentCells = (tilesCopy, selectedCellIndex) => {
        this.highlightCell(tilesCopy, selectedCellIndex);
        this.highlightCell(tilesCopy, [selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        this.highlightCell(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] - 1]);
        this.highlightCell(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] + 1]);
        this.highlightCell(tilesCopy, [selectedCellIndex[0] + 1, selectedCellIndex[1]]);
    }
    startGrowing = (tiles) => {
        tiles.map(row => {
            return row.map(tile => {
                tile.startGrowing();
            });
        });
    }
    finishGrowing = (tiles) => {
        tiles.map(row => {
            return row.map(tile => {
                tile.finishGrowing();
            });
        });
    }
    rescore = (tiles, rescore) => {
        tiles.map(row => {
            return row.map(tile => {
                rescore += tile.rescore();
            });
        });
        return rescore;
    }
    plantsAttack = (tiles) => {
        tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (tile.type === TileTypes.Soil && tile.canAttack()) {
                    this.transformAdjacentTiles(tiles, tile, [rowIndex, tileIndex], true);
                    tile.finishedAttacking
                }
            });
        });
    }
    cellClicked = (index) => {
        let tilesCopy = cloneDeep(this.state.tiles);
        if (this.state.turnConfirmed) {
            if (this.state.selectedCellIndex) {
                this.highlightAdjacentCells(tilesCopy, this.state.selectedCellIndex);
            }

            this.highlightAdjacentCells(tilesCopy, index);
            this.setState({
                selectedCellIndex: index,
                tiles: tilesCopy
            })
        }
    }
    newTileClicked = (tile, e) => {
        if (!this.state.turnConfirmed)
            return;
        let tilesCopy = cloneDeep(this.state.tiles),
            tileChanged = { changed: false },
            rescore = 0;

        e.stopPropagation();
        this.placeTile(tilesCopy, tile, tileChanged);
        this.transformAdjacentTiles(tilesCopy, tile, this.state.selectedCellIndex, false, tileChanged);
        this.finishGrowing(tilesCopy, tileChanged);
        this.plantsAttack(tilesCopy, tileChanged);
        rescore = this.rescore(tilesCopy, rescore);

        if (tileChanged.changed) {
            this.setState((prev) => ({
                tiles: tilesCopy,
                selectedCellIndex: null,
                turnConfirmed: false,
                score: prev.score += rescore
            }));
        }
    }
    confirm = () => {
        this.setState((prev) => ({
            turnConfirmed: true, previousScore: prev.score,
            tilesChanged: false
        }), this.turnSetup());
    }
    goBack = () => {
        if (!this.state.turnConfirmed)
            this.setState((prevState) => ({
                tiles: prevState.previousTurn,
                turnConfirmed: true,
                score: prevState.previousScore,
                tilesChanged: false
            }));
    }
    showTileBag = () => {
        if (this.state.selectedCellIndex && this.state.turnConfirmed)
            return
    }
    render() {
        return (
            <div className="board-game">
                <div className="space-between-wrapper score">
                <div>Score : {this.state.score}</div>
                <BoardGameHelp />
                </div>
                <div className="board-game-wrapper center" >
                    <Board tiles={this.state.tiles}
                        cellClicked={this.cellClicked}
                        newTileClicked={this.newTileClicked}
                        selectedCellIndex={this.state.selectedCellIndex}
                        tileBagContent={this.state.tileBagContent}
                        turnConfirmed={this.state.turnConfirmed}
                    />
                    <div className="confirm-buttons-wrapper">
                        {!this.state.turnConfirmed ? <button className="experiment-button confirm-button" onClick={this.confirm}>Confirm</button> : null}
                        {!this.state.turnConfirmed ? <button className="experiment-button cancel-button" onClick={this.goBack}>Undo</button> : null}
                    </div>
                </div>
                <div className={(this.state.selectedCellIndex && this.state.turnConfirmed) ? "center" : "center hidden"}>
                    <TileBag tiles={this.state.tileBagContent} newTileClicked={this.newTileClicked} />
                </div>
            </div>
        )
    }
}

export default Game