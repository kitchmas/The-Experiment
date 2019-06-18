import React from 'react';

class GameOverScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game-over-screen nes-container is-dark">
                <h2>GAME OVER</h2>
                <h4>{this.props.monsterName} Wins</h4>
                <h4>Time: {this.props.score}s</h4>
                <h5 onClick={this.props.retry} className="retry">Retry?</h5>
                <h6>Tip: you can nerf enemy attacks if you time it right</h6>
            </div>
        );
    }
}

export default GameOverScreen