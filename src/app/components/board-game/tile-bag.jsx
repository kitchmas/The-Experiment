import React from 'react';

import Tile from '../board-game/tile.jsx';
import '../../content/css/board-game.css';

class TileBag extends React.Component {
    render() {
        let tiles = this.props.tiles.map((tile, i) => {
            return (<Tile key={i} tile={tile}
                onClick={(e) => this.props.newTileClicked(tile, e)} />
            )
        });
        return (
            <div className="tile-bag" >
                {tiles}
            </div>)
    }
}

export default TileBag