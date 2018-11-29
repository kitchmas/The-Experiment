import React from 'react';

import Tile from '../board-game/tile.jsx';
import TileBag from '../board-game/tile-bag.jsx';
import '../../content/css/board-game.css';
import shuffle from '../../helpers/shuffle';

class Board extends React.Component {
    state = {
        tiles: [Array(3).fill({ type: null }), Array(3).fill({ type: null }), Array(3).fill({ type: null })],
        // tiles: [[{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }],
        // [{ type: null }, { type: null }, { type: null }, { type: null }, { type: null }]],
        selectedCell: null,
        tileBagContent: [{ type: "fire" }],
        previouslyDrawnTiles: [],
        starterTiles: [{ type: "water" }, { type: "fire" }, { type: "earth" }]
    }
    componentWillMount = () => {
        this.turnSetup();

    }
    renderTile = (index) => {
        return <Tile type={this.state.tiles[index[0]][index[1]].type} />
    }
    showTileBag = (indexMap) => {
        if (JSON.stringify(this.state.selectedCell) === JSON.stringify(indexMap))
            return <TileBag tiles={this.state.tileBagContent} newTileClicked={this.newTileClicked} />
    }
    turnSetup = () => {
        this.setState({
            selectedCell: null,
        });

        this.checkForThreeOfAkind();
        this.drawNextTile();
    }
    drawNextTile = () => {
        let starterTiles = this.state.starterTiles.slice(),
            previouslyDrawnTiles = this.state.previouslyDrawnTiles,
            tileBagContent = [];

        shuffle(starterTiles);

        //Draws the next tile and if the same tile has been drawn three times in a row it draws a different tile
        const previouslyDrawnTilesLength = previouslyDrawnTiles.length;
        if (previouslyDrawnTilesLength > 1) {
            const previouslyDrawnTiles1 = previouslyDrawnTiles[previouslyDrawnTilesLength - 1],
                previouslyDrawnTiles2 = previouslyDrawnTiles[previouslyDrawnTilesLength - 2];

            if (previouslyDrawnTiles1 === starterTiles[0] && previouslyDrawnTiles1 === previouslyDrawnTiles2) {
                tileBagContent.push(starterTiles[1]);
                previouslyDrawnTiles.push(starterTiles[1]);
            }
            else
                tileBagContent.push(starterTiles[0]);
            previouslyDrawnTiles.push(starterTiles[0]);
        } else {
            tileBagContent.push(starterTiles[0]);
            previouslyDrawnTiles.push(starterTiles[0]);
        }

        this.setState({
            tileBagContent: tileBagContent,
            previouslyDrawnTiles: previouslyDrawnTiles
        });
    }
    checkForThreeOfAkind = () => {
        let tilesCopy = this.state.tiles.slice(),
            selectedCellIndex = this.state.selectedCell;

        if (selectedCellIndex === null)
            return;

        let checkMatchingTiles = (indexArr) => {
            if ((indexArr[0] >= 0 && indexArr[0] <= tilesCopy.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= tilesCopy[indexArr[0]].length - 1)
                && (tilesCopy[indexArr[0]][indexArr[1]].type === tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]].type)) {
                return (true)
            }
        }

        let threeOrMoreMatchesFound = false;
        // check cells above 
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] - 2, selectedCellIndex[1]])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] - 2][selectedCellIndex[1]].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1] - 1])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells below and above
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells below 
        if (checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] + 2, selectedCellIndex[1]])) {
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] + 2][selectedCellIndex[1]].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1] - 1])) {
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells left 
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 2])) {
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 1].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 2].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1]) && checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1] - 1])) {
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 1].type = null;
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1]) && checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1] - 1])) {
            debugger;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 1].type = null;
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells left & right
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1]] - 1) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells right 
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 2])) {
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 2].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1]) && checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }
        if (checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1]) && checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells above and right 
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells above and left 
        if (checkMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1])) {
            tilesCopy[selectedCellIndex[0] - 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells below and right 
        if (checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1])) {
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] + 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        // check cells below and left 
        if (checkMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]) && checkMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1])) {
            tilesCopy[selectedCellIndex[0] + 1][selectedCellIndex[1]].type = null;
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1] - 1].type = null;
            threeOrMoreMatchesFound = true;
        }

        if (threeOrMoreMatchesFound)
            tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]].type = null;

        this.setState({
            tiles: tilesCopy
        })
    }
    convertAdjacentTiles = (array, selectedCellIndex, from, too) => {
        let tryTransformTile = (indexArr) => {
            if ((indexArr[0] >= 0 && indexArr[0] <= array.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= array[indexArr[0]].length - 1)
                && (array[indexArr[0]][indexArr[1]].type === from)) {
                let tile = Object.assign({}, array[indexArr[0]][indexArr[1]]);
                tile.type = too;
                array[indexArr[0]][indexArr[1]] = tile;
            }
        }

        tryTransformTile([selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] - 1]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] + 1]);
        tryTransformTile([selectedCellIndex[0] + 1, selectedCellIndex[1]]);

    }
    placeTile = (type) => {
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]]);
        selectedTileCopy.type = type;
        tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]] = selectedTileCopy;

        this.setState({
            tiles: tilesCopy
        });
    }
    transformAdjacentTiles = (type) => {
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice();

        switch (type) {
            case "water":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "water");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "lava", "obsidian");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "earth", "sand");
                break;
            case "fire":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "water");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "fire");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "glass");
                break;
            case "water":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "sand");
                break;
            case "ice":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "ice");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "earth");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "water");
                break;
            case "wood":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire");
                break;
            case "sand":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "glass");
                break;
            case "glass":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "lava");
                break;
            case "lava":
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "obsidian");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "lava");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "lava");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "lava");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "lava");
                this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava");
                break;
            case "plant":
                break;
            default:
        }
        this.setState({
            tiles: tilesCopy,
        });
    }
    cellClicked = (index) => {
        if (this.state.tiles[index[0]][index[1]].type === null) {
            this.setState({
                selectedCell: index
            })
        }
    }
    newTileClicked = (type, e) => {
        e.stopPropagation();
        this.placeTile(type);
        this.transformAdjacentTiles(type);
        this.turnSetup();
    }
    render() {
        let boardRows = this.state.tiles.map((rows, i) => {
            let boardCols = rows.map((cols, j) =>
                <div className="board-cell" onClick={() => this.cellClicked([i, j])}>
                    {this.showTileBag([i, j])}
                    {this.renderTile([i, j])}
                </div>)
            return <div className="board-row" >{boardCols}</div>
        });
        return (
            <div className="board">
                {boardRows}
            </div>
        )
    }
}

export default Board