import React from 'react';

import '../../../content/css/board-game.css';
import '../../../content/css/tile-detail.css';
import { SeedTypes } from './tile-enums';

class TileDetail extends React.Component {
    render() {
        return (
            <div className="tile-detail">
                <div className={"tile-icon " + this.props.tile.className}>
                    {this.props.tile.name}
                </div>
                <div className="tile-description">
                <div><b>Score:</b> {this.props.tile.score}</div>
                <div>{this.props.tile.description}</div>
            </div>
            </div>

        )
    }
}

export default TileDetail