import React from 'react';

import '../../../content/css/sound-board.css';

class SoundBoardIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sound-board-icon play-wrapper">
                <div className="hidden">
                    <i className="fas fa-volume-up"></i>
                </div>
                <div className="play-triangle"></div>
            </div>
        );
    }
}

export default SoundBoardIcon