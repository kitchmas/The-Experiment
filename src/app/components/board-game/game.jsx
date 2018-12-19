import React from 'react';

import cloneDeep from 'lodash.clonedeep';

import Board from '../board-game/board.jsx';
import { EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, Tile, RockTile, WeedTile } from '../../helpers/microGarden/tile.js';
import shuffle from '../../helpers/shuffle.js';

import { TileTypes, TileStatus, TileEffects, SeedTypes, PlantLifeStatus } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        turnConfirmed: true,
        tiles: [Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile()), Array(3).fill(new EmptyTile())],
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
            tileBagContent = [new WaterTile(), new SoilTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)],
            specialTiles = [new SoilTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)];

        shuffle(specialTiles);
        tileBagContent.push(specialTiles[0]);

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
                        this.setState((prev) => ({
                            score: prev.score += tilesCopy[indexArr[0]][indexArr[1]].getScore()
                        }));
                        if (tileChanged)
                            tileChanged.changed = true;
                    } else if (attack.nestedTileType === tileToChange.nestedTileType || attack.nestedTileType === TileTypes.All) {
                        tileToChange.nestedTileBeingAttacked(attack.attack());
                        tilesCopy[indexArr[0]][indexArr[1]] = tileToChange;
                        this.setState((prev) => ({
                            score: prev.score += tilesCopy[indexArr[0]][indexArr[1]].getScore()
                        }));
                        if (tileChanged)
                            tileChanged.changed = true;
                    }
                }
            }
            else if (tileToChange.canReplaceTile(tile)) {
                tilesCopy[indexArr[0]][indexArr[1]] = tile.getInstance();
                this.setState((prev) => ({
                    score: prev.score += tilesCopy[indexArr[0]][indexArr[1]].getScore()
                }));
                if (tileChanged)
                    tileChanged.changed = true;
            } else {
                if (tileToChange.tryPlaceTileOntop(tile)) {
                    tilesCopy[indexArr[0]][indexArr[1]] = tileToChange;
                    this.setState((prev) => ({
                        score: prev.score += tile.getScore()
                    }));
                    if (tileChanged)
                        tileChanged.changed = true;
                }
            }
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
        let tilesCopy = cloneDeep(this.state.tiles),
            tileChanged = { changed: false },
            rescore = 0;

        e.stopPropagation();
        this.placeTile(tilesCopy, tile, tileChanged);
        this.transformAdjacentTiles(tilesCopy, tile, this.state.selectedCellIndex, tileChanged);
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
    render() {
        return (
            <div className="center-page-wrapper">
                <div>
                    <div>Score : {this.state.score}</div>
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