import React from 'react';
import '../../../content/css/board-game.css';

class BoardGameIcon extends React.Component {

    render() {
        return (
            <div className="board">
                <div className="board-row">
                    <div className="board-cell">
                        <div className="tile-icon plant-tile"><b>Plant</b></div>
                    </div>
                    <div className="board-cell">

                    </div>
                </div>
                <div className="board-row">
                    <div className="board-cell">
                    </div>
                    <div className="board-cell">
                        <div className="tile-icon soil-tile"><b>Soil</b></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardGameIcon