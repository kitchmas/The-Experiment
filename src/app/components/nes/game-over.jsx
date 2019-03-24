import React from 'react';

class GameOverScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game-over-screen nes-container is-dark">
                <h1>GAME OVER</h1>
                <h3>{this.props.monsterName} Wins</h3>
                <h3>Time: {this.props.score}s</h3>
                <h4 onClick={this.props.retry} className="retry">Retry?</h4>
            </div>
        );
    }
}

export default GameOverScreen