import React from 'react';

import Tile from '../board-game/tile.jsx';
import '../../content/css/board-game.css';

class TileBag extends React.Component {
    render() {
        let tiles = this.props.tiles.map((tile, i) => {
            return (<Tile key={i} type={tile.type}
                onClick={(e) => this.props.newTileClicked(tile.type, e)} />
            )
        });
        return (
            <div className="tile-bag" >
                {tiles}
            </div>)
    }
}

export default TileBag