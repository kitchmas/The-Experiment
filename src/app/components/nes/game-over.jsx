import React from 'react';

class GameOverScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game-over-screen nes-container is-rounded is-dark">
                <h1>Game Over</h1>
                <h3>Score: 100s</h3>
                <h4 onClick={this.props.retry} className="retry">Retry?</h4>
            </div>
        );
    }
}

export default GameOverScreen