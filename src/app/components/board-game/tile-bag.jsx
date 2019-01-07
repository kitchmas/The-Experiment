import React from 'react';

import Tile from '../board-game/tile.jsx';
import '../../content/css/board-game.css';

class TileBag extends React.Component {
    render() {
        let tiles = this.props.tiles.map((tile, i) => {
            return (<div  key={i} className="square"><Tile tile={tile}
                onClick={(e) => this.props.newTileClicked(tile, e)} />
                </div>
            )
        });
        return (
            <div className="tile-bag center" >
                    {tiles}
            </div>)
    }
}

export default TileBag