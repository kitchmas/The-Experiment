import React from 'react';

import '../../content/css/board-game.css';

class Tile extends React.Component {
    render() {
        return (
            <div className={"tile-icon " + this.props.tile.className} onClick={this.props.onClick}>
                {this.props.tile.name}
            </div>
        )
    }
}

export default Tile