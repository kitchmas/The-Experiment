import React from 'react';

import '../../content/css/board-game.css';

class Tile extends React.Component {
    render() {
        return (
            <div className={"tile-icon " + this.props.type} onClick={this.props.onClick}>
                {this.props.type}
            </div>
        )
    }
}

export default Tile