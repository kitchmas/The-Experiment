import React from 'react';

import Tile from '../board-game/tile.jsx';
import TileBag from '../board-game/tile-bag.jsx';
import '../../content/css/board-game.css';

class Board extends React.Component {
    state = {
        tiles: [Array(3).fill({ type: null }), Array(3).fill({ type: null }), Array(3).fill({ type: null })],
        selectedCell: null
    }
    renderTile = (index) => {
        return <Tile type={this.state.tiles[index[0]][index[1]].type} />
    }
    showTileBag = (indexMap) => {
        if (JSON.stringify(this.state.selectedCell) === JSON.stringify(indexMap)) return <TileBag newTileClicked={this.newTileClicked} />
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

        if (type === "water")
            this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "fire", "water");
        if (type === "fire") {
            this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "water", null);
            this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "ice", "water");
        }
        if (type === "ice")
            this.convertAdjacentTiles(tilesCopy, selectedCellIndex, "water", "ice");

        this.setState({
            tiles: tilesCopy,
            selectedCell: null
        });
    }
    render() {
        return (
            <div>
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