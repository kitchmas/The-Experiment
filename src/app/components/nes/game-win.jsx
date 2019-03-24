import React from 'react';

class GameWin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game-win-screen nes-container is-dark">
                <i class="nes-icon trophy is-large"></i>
                <h1>YOU WIN</h1>
                <h3>Time: {this.props.score}s</h3>
                <h4 onClick={this.props.retry} className="retry">Restart?</h4>
            </div>
        );
    }
}

export default GameWin