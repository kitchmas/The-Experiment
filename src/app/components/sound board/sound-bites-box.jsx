import React from 'react';

import '../../../content/css/sound-board.css';

class SoundBitesBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const soundBites = this.props.soundBites.map((soundBite) =>
            <button key={soundBite.id} className="experiment-button sound-bite" onClick={() => { this.props.play(soundBite.id) }}>
                <span>{soundBite.name}</span>
                <div className="play-wrapper">
                    <div className={this.props.playingAudioId === soundBite.id ? " " : "hidden"}>
                        <i className="fas fa-volume-up"></i>
                    </div>
                    <div className={this.props.playingAudioId === soundBite.id ? "hidden" : "play-triangle"}></div>

                </div>
            </button>);
        return (
            <div className="sound-bites-box-wrapper">
              <h1>Sound Bites</h1>
                <div className="sound-bites-box">
                    {soundBites}
                </div>
            </div>
        );
    }
}

export default SoundBitesBox