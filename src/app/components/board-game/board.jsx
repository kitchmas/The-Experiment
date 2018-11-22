import React from 'react';

import Tile from '../board-game/tile.jsx';
import TileBag from '../board-game/tile-bag.jsx';
import '../../content/css/board-game.css';

class Board extends React.Component {
    state = {
        tiles: Array(9).fill({ type: null }),
        selectedCell: null
    }
    renderTile = (index) => {
        return <Tile type={this.state.tiles[index].type} />
    }
    cellClicked = (index) => {
        this.setState({
            selectedCell: index
        })
    }
    showTileBag = (index) => {
        if (this.state.selectedCell === index) return <TileBag fireClicked={this.fireClicked}
            waterClicked={this.waterClicked}
            iceClicked={this.iceClicked} />
    }
    tileClicked = (type, e) => {
        e.stopPropagation();
        let tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[this.state.selectedCell]);
        selectedTileCopy.type = type;
        tilesCopy[this.state.selectedCell] = selectedTileCopy;
        this.setState({
            tiles: tilesCopy,
            selectedCell: null
        });
    }
    tryTransformTile = (array, index, from,to) => {
        debugger;
        if (array[index] && array[index].type === from) {
            let tile = Object.assign({}, array[index]);
            tile.type = to;
            array[index] = tile;
        }
    }
    fireClicked = (type, e) => {
        e.stopPropagation();
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[selectedCellIndex]);
        selectedTileCopy.type = type;
        tilesCopy[this.state.selectedCell] = selectedTileCopy;

        this.tryTransformTile(tilesCopy, selectedCellIndex - 3,"water","");
        this.tryTransformTile(tilesCopy, selectedCellIndex - 1,"water","");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 3,"water","");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 1,"water","");
        this.tryTransformTile(tilesCopy, selectedCellIndex - 3,"ice","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex - 1,"ice","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 3,"ice","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 1,"ice","water");
      
        this.setState({
            tiles: tilesCopy,
            selectedCell: null
        });

    }
    waterClicked = (type, e) => {
        e.stopPropagation();
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[selectedCellIndex]);
        selectedTileCopy.type = type;
        tilesCopy[this.state.selectedCell] = selectedTileCopy;

        this.tryTransformTile(tilesCopy, selectedCellIndex - 3,"fire","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex - 1,"fire","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 3,"fire","water");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 1,"fire","water");
      
        this.setState({
            tiles: tilesCopy,
            selectedCell: null
        });

    }
    iceClicked = (type, e) => {
        e.stopPropagation();
        let selectedCellIndex = this.state.selectedCell,
            tilesCopy = this.state.tiles.slice(),
            selectedTileCopy = Object.assign({}, tilesCopy[selectedCellIndex]);
        selectedTileCopy.type = type;
        tilesCopy[this.state.selectedCell] = selectedTileCopy;

        this.tryTransformTile(tilesCopy, selectedCellIndex - 3,"water","ice");
        this.tryTransformTile(tilesCopy, selectedCellIndex - 1,"water","ice");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 3,"water","ice");
        this.tryTransformTile(tilesCopy, selectedCellIndex + 1,"water","ice");
      
        this.setState({
            tiles: tilesCopy,
            selectedCell: null
        });

    }
    transformAdjacentTiles  = (from,to) =>{

    }
    render() {
        return (
            <div>
                <div className="board">
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked(0)}>
                            {this.showTileBag(0)}
                            {this.renderTile(0)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(1)}>
                            {this.showTileBag(1)}
                            {this.renderTile(1)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(2)}>
                            {this.showTileBag(2)}
                            {this.renderTile(2)}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked(3)}>
                            {this.showTileBag(3)}
                            {this.renderTile(3)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(4)}>
                            {this.showTileBag(4)}
                            {this.renderTile(4)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(5)}>
                            {this.showTileBag(5)}
                            {this.renderTile(5)}
                        </div>
                    </div>
                    <div className="board-row">
                        <div className="board-cell" onClick={() => this.cellClicked(6)}>
                            {this.showTileBag(6)}
                            {this.renderTile(6)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(7)}>
                            {this.showTileBag(7)}
                            {this.renderTile(7)}
                        </div>
                        <div className="board-cell" onClick={() => this.cellClicked(8)}>
                            {this.showTileBag(8)}
                            {this.renderTile(8)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board