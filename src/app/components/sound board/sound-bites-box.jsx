import React from 'react';

import '../../../content/css/sound-board.css';

class SoundBitesBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const soundBites = this.props.soundBites.map((soundBite) =>
        <button key={soundBite.id} className="experiment-button sound-bite" onClick={() => {this.props.play(soundBite.id)}}>{soundBite.name}</button>);
        return (
            <div className="sound-bites-box">
            {soundBites}
        </div>
        );
    }
}

export default SoundBitesBox