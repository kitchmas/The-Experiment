import React from 'react';

import url from '../../../content/audio/Doubtfire/this-idiot.mp3';
import '../../../content/css/sound-board.css';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio(url);
    }
    play = () => {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause = () => {
        this.audio.pause();
    }
    render() {
        return (
            <div className="page content-wrapper">
                <div className="sound-bite-wrapper">
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                    <button className="experiment-button sound-bite" onClick={this.play}>Play</button>
                </div>
            </div>
        );
    }
}

export default SoundBoard