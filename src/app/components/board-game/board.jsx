import React from 'react';

import Tile from '../board-game/tile.jsx';
import TileBag from '../board-game/tile-bag.jsx';

import '../../content/css/board-game.css';

class Board extends React.Component {
    renderTile = (index) => {
        return <Tile tile={this.props.tiles[index[0]][index[1]]} />
    }
    showTileBag = (indexMap) => {
        if (JSON.stringify(this.props.selectedCell) === JSON.stringify(indexMap))
            return <TileBag tiles={this.props.tileBagContent} newTileClicked={this.props.newTileClicked} />
    }
    render() {
        let boardRows = this.props.tiles.map((rows, i) => {
            let boardCols = rows.map((cols, j) =>
                <div key={j} className="board-cell" onClick={() => this.props.cellClicked([i, j])}>
                    {this.showTileBag([i, j])}
                    {this.renderTile([i, j])}
                </div>)
            return <div key={i} className="board-row" >{boardCols}</div>
        });
        return (
            <div className="board">
                {boardRows}
            </div>
        )
    }
}

export default Board