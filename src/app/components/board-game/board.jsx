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
    turnSetup = () => {
        let starterTiles = this.state.starterTiles.slice(),
            previouslyDrawnTiles = this.state.previouslyDrawnTiles,
            tileBagContent = [];

        shuffle(starterTiles);

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

        this.checkForThreeOfAkind()
    }
    checkForThreeOfAkind = () => {
        let tiles = this.state.tiles.slice(),
            selectedCellIndex = this.state.selectedCell;

        if (selectedCellIndex === null)
            return;
        // for(let i = 0; i < tiles.length; i++ ){
        //     for(let j = 0; j < tiles[i].length; j++){

        let matchedTiles = 0;

        let countMatchingTiles = (indexArr) => {
            if ((indexArr[0] >= 0 && indexArr[0] <= tiles.length - 1) &&
                (indexArr[1] >= 0 && indexArr[1] <= tiles[indexArr[0]].length - 1)
                && (tiles[indexArr[0]][indexArr[1]].type === tiles[selectedCellIndex[0]][selectedCellIndex[1]].type)) {

                matchedTiles++;
            }
        }

        countMatchingTiles([selectedCellIndex[0] - 1, selectedCellIndex[1]]);
        countMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] - 1]);
        countMatchingTiles([selectedCellIndex[0], selectedCellIndex[1] + 1]);
        countMatchingTiles([selectedCellIndex[0] + 1, selectedCellIndex[1]]);

        if (matchedTiles > 1) {
            this.convertAdjacentTiles(tiles, [i, j], tiles[i][j].type, null)
        }




        //     }
        // }
    }
    renderTile = (index) => {
        return <Tile type={this.state.tiles[index[0]][index[1]].type} />
    }
    showTileBag = (indexMap) => {
        if (JSON.stringify(this.state.selectedCell) === JSON.stringify(indexMap))
            return <TileBag tiles={this.state.tileBagContent} newTileClicked={this.newTileClicked} />
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
    cellClicked = (index) => {
        if (this.state.tiles[index[0]][index[1]].type === null) {
            this.setState({
                selectedCell: index
            })
        }
    }
    newTileClicked = (type, e) => {
        e.stopPropagation();
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]]);
        selectedTileCopy.type = type;
        tilesCopy[selectedCellIndex[0]][selectedCellIndex[1]] = selectedTileCopy;

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
            selectedCell: null
        });
        this.turnSetup();
    }
    render() {
        return (
            <div>
                {/* <div className="board">
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([0, 0])}>
                            {this.showTileBag([0, 0])}
                            {this.renderTile([0, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 1])}>
                            {this.showTileBag([0, 1])}
                            {this.renderTile([0, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 2])}>
                            {this.showTileBag([0, 2])}
                            {this.renderTile([0, 2])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 3])}>
                            {this.showTileBag([0, 3])}
                            {this.renderTile([0, 3])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 4])}>
                            {this.showTileBag([0, 4])}
                            {this.renderTile([0, 4])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([1, 0])}>
                            {this.showTileBag([1, 0])}
                            {this.renderTile([1, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 1])}>
                            {this.showTileBag([1, 1])}
                            {this.renderTile([1, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 2])}>
                            {this.showTileBag([1, 2])}
                            {this.renderTile([1, 2])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 3])}>
                            {this.showTileBag([1, 3])}
                            {this.renderTile([1, 3])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 4])}>
                            {this.showTileBag([1, 4])}
                            {this.renderTile([1, 4])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([2, 0])}>
                            {this.showTileBag([2, 0])}
                            {this.renderTile([2, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 1])}>
                            {this.showTileBag([2, 1])}
                            {this.renderTile([2, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 2])}>
                            {this.showTileBag([2, 2])}
                            {this.renderTile([2, 2])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 3])}>
                            {this.showTileBag([2, 3])}
                            {this.renderTile([2, 3])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 4])}>
                            {this.showTileBag([2, 4])}
                            {this.renderTile([2, 4])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([3, 0])}>
                            {this.showTileBag([3, 0])}
                            {this.renderTile([3, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([3, 1])}>
                            {this.showTileBag([3, 1])}
                            {this.renderTile([3, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([3, 2])}>
                            {this.showTileBag([3, 2])}
                            {this.renderTile([3, 2])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([3, 3])}>
                            {this.showTileBag([3, 3])}
                            {this.renderTile([3, 3])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([3, 4])}>
                            {this.showTileBag([3, 4])}
                            {this.renderTile([3, 4])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([4, 0])}>
                            {this.showTileBag([4, 0])}
                            {this.renderTile([4, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([4, 1])}>
                            {this.showTileBag([4, 1])}
                            {this.renderTile([4, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([4, 2])}>
                            {this.showTileBag([4, 2])}
                            {this.renderTile([4, 2])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([4, 3])}>
                            {this.showTileBag([4, 3])}
                            {this.renderTile([4, 3])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([4, 4])}>
                            {this.showTileBag([4, 4])}
                            {this.renderTile([4, 4])}
                        </div>
                    </div>
                </div> */}





                <div className="board">
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([0, 0])}>
                            {this.showTileBag([0, 0])}
                            {this.renderTile([0, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 1])}>
                            {this.showTileBag([0, 1])}
                            {this.renderTile([0, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([0, 2])}>
                            {this.showTileBag([0, 2])}
                            {this.renderTile([0, 2])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([1, 0])}>
                            {this.showTileBag([1, 0])}
                            {this.renderTile([1, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 1])}>
                            {this.showTileBag([1, 1])}
                            {this.renderTile([1, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([1, 2])}>
                            {this.showTileBag([1, 2])}
                            {this.renderTile([1, 2])}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked([2, 0])}>
                            {this.showTileBag([2, 0])}
                            {this.renderTile([2, 0])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 1])}>
                            {this.showTileBag([2, 1])}
                            {this.renderTile([2, 1])}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked([2, 2])}>
                            {this.showTileBag([2, 2])}
                            {this.renderTile([2, 2])}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Board