import React from 'react';

import cloneDeep from 'lodash/clonedeep';
const Link = require('react-router-dom').Link;

import Board from '../board-game/board.jsx';
import TileBag from '../board-game/tile-bag.jsx';
import BoardGameHelp from '../board-game/board-game-help.jsx';

import { EmptyTile, WaterTile, SoilTile, SeedTile, PlantTile, Tile, RockTile, WeedTile } from '../../helpers/microGarden/tile.js';

import { TileTypes, TileStatus, TileEffects, SeedTypes, PlantLifeStatus } from '../board-game/tile-enums.js';

class Game extends React.Component {
    state = {
        turnConfirmed: true,
        tiles: [[new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
        [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
        [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
        [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
        [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()]],
        selectedCellIndex: null,
        tileBagContent: [new WaterTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)],
        score: 0,
        previousScore: 0,
        tilesChanged: false,
        gameOver: false
    }
    componentWillMount = () => {
        this.turnSetup();
        let tiles = cloneDeep(this.state.tiles);

        this.setState({
            tiles: tiles,
        });
    }
    restart = () => {
        this.setState({
            turnConfirmed: true,
            tiles: [[new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
            [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
            [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
            [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()],
            [new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile(), new SoilTile()]],
            selectedCellIndex: null,
            tileBagContent: [new WaterTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)],
            score: 0,
            previousScore: 0,
            tilesChanged: false,
            gameOver: false
        }, this.turnSetup());
    }
    turnSetup = () => {
        let tiles = cloneDeep(this.state.tiles),
            tileBagContent = [new WaterTile(), new SeedTile(), new RockTile(), new SeedTile(SeedTypes.Fire)],
            gameOver = true;

        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                tiles[i][j].destroyed = false;
                tiles[i][j].canRescore = false;
                if (tiles[i][j].type === TileTypes.Rock || tiles[i][j].type === TileTypes.Soil && tiles[i][j].hasNestedTile) {
                    if (tiles[i][j].hasNestedTile) {
                        tiles[i][j].getNestedTile().canRescore = false;
                    }
                    continue;
                } else {
                    gameOver = false;
                }
            }
        }

        if (gameOver) {
            this.setState({
                gameOver: true
            })
            return;
        }

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
                if (attack && attack.targetType === tileToChange.type || attack.targetType === TileTypes.All) {
                    if (!attack.nestedAttack) {
                        tilesCopy[indexArr[0]][indexArr[1]] = attack.attack();
                        tilesCopy[indexArr[0]][indexArr[1]].destroyed = true;
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
    unHighlightCell = (tilesCopy, indexArr, tile, attacking, tileChanged) => {
        if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
            (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)) {

            let tileToChange = tilesCopy[indexArr[0]][indexArr[1]];
            tileToChange = tileToChange.clone();
            tileToChange.selected = false;

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
    unHighlightAdjacentCells = (tilesCopy, selectedCellIndex) => {
        this.unHighlightCell(tilesCopy, selectedCellIndex);
        this.unHighlightCell(tilesCopy, [selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        this.unHighlightCell(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] - 1]);
        this.unHighlightCell(tilesCopy, [selectedCellIndex[0], selectedCellIndex[1] + 1]);
        this.unHighlightCell(tilesCopy, [selectedCellIndex[0] + 1, selectedCellIndex[1]]);
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
                    tile.finishedAttacking();
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
        this.unHighlightAdjacentCells(tilesCopy, this.state.selectedCellIndex);
        rescore = this.rescore(tilesCopy, rescore);

        if (tileChanged.changed) {
            this.setState((prev) => ({
                tiles: tilesCopy,
                turnConfirmed: false,
                score: prev.score += rescore
            }));
        }
    }
    confirm = () => {
        this.setState((prev) => ({
            turnConfirmed: true, previousScore: prev.score,
            tilesChanged: false,
            selectedCellIndex: null,
        }), this.turnSetup());
    }
    goBack = () => {
        if (!this.state.turnConfirmed)
            this.setState((prevState) => ({
                tiles: prevState.previousTurn,
                turnConfirmed: true,
                score: prevState.previousScore,
                tilesChanged: false,
                selectedCellIndex: null
            }));
    }
    showTileBag = () => {
        if (this.state.selectedCellIndex && this.state.turnConfirmed)
            return
    }
    render() {
        let content;
        if (this.state.gameOver) {
            content = <div className="board-game">
                <div className="center space-between-wrapper score-row">
                    <span></span>   <BoardGameHelp />
                </div>
                <div className="center-text">
                    <h1 className="center-text">OVER <b />GROWN</h1>
                    <h1 className="center-text">SCORE: {this.state.score}</h1>
                    <button className="retry experiment-button cancel-button margin-top-default" onClick={this.restart}>RETRY?</button>
                </div>
            </div>
        }
        else {
            content = <div className="board-game">
                <div className="center space-between-wrapper score-row">
                    <div className="score ">Score : {this.state.score}</div>
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
        }
        return (
            <div>
                {content}
                <Link className="next" to="/day-and-night">
                    <h1>NEXT</h1>
                </Link>
            </div>
        )
    }
}

export default Game