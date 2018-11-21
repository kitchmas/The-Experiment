import React from 'react';

import Board from '../board-game/board.jsx';

class Game extends React.Component {
    render() {
        return (
            <div className="center-page-wrapper">
                <Board />
            </div>
        )
    }
}

export default Game