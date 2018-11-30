import React from 'react';

import Board from '../board-game/board.jsx';
import shuffle from '../../helpers/shuffle';

class Game extends React.Component {
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
    turnSetup = () => {
        this.setState({
            selectedCell: null,
        });

        // this.checkForThreeOfAkind();
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
    tryAndConvertAdjacentTiles = (array, selectedCellIndex, from, too) => {

        let tryTransformTile = (indexArr) => {
            if ((indexArr[0] >= 0 && indexArr[0] <= array.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= array[indexArr[0]].length - 1)
                && (array[indexArr[0]][indexArr[1]].type === from)) {
                let tile = Object.assign({}, array[indexArr[0]][indexArr[1]]);
                tile.type = too;
                array[indexArr[0]][indexArr[1]] = tile;
                oneOrMoreTilesConverted = true;
            }
        },
        oneOrMoreTilesConverted = false;

        tryTransformTile([selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] - 1]);
        tryTransformTile([selectedCellIndex[0], selectedCellIndex[1] + 1]);
        tryTransformTile([selectedCellIndex[0] + 1, selectedCellIndex[1]]);

        return oneOrMoreTilesConverted;
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
            tilesCopy = this.state.tiles.slice(),
            oneOrMoreTilesConverted = false;


        switch (type) {
            case "water":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "vapour") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "lava", "obsidian") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "earth", "sand") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "water") ? oneOrMoreTilesConverted = true : null;
                break;
            case "fire":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "vapour") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "water") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "fire") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "glass") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "fire") ? oneOrMoreTilesConverted = true : null;
                break;
            case "ice":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "ice") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "earth") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "water") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "ice") ? oneOrMoreTilesConverted = true : null;
                break;
            case "wood":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "fire") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "wood") ? oneOrMoreTilesConverted = true : null;
                break;
            case "sand":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "glass") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "sand") ? oneOrMoreTilesConverted = true : null;
                break;
            case "glass":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "glass") ? oneOrMoreTilesConverted = true : null;
                break;
            case "earth":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "sand") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "earth") ? oneOrMoreTilesConverted = true : null;
                break;
            case "lava":
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "obsidian") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "wood", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "plant", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "sand", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "glass", "lava") ? oneOrMoreTilesConverted = true : null;
                this.tryAndConvertAdjacentTiles(tilesCopy, selectedCellIndex, "vapour", "lava") ? oneOrMoreTilesConverted = true : null;
                break;
            case "plant":
                break;
            default:
        }



        this.setState({
            tiles: tilesCopy,
        });

        return oneOrMoreTilesConverted;
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
        if (!this.transformAdjacentTiles(type))
            this.placeTile(type);

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