import React from 'react';

import '../../../content/css/bacon-eggs.css';

class BaconEgg extends React.Component {
    state = {
        started: false,
        timer: 100,
        round: 1,
        roundTimer: 3,
        roundOver: false,
        bacon: false,
        egg: false,
        baconClass: "",
        baconTop: "",
        baconLeft: "",
        baconClicked: false,
        eggClass: "",
        eggTop: "",
        eggLeft: "",
        eggClicked: false,
        colors:["red","yellow"]
    }
    componentWillUnmount() {
        clearInterval(this.timerInterval);
        clearInterval(this.roundInterval);
    }
    startTimer = () => {
        this.timerInterval = setInterval(
            () => {
                this.setState((prev) => ({ timer: prev.timer -= 1 }));
                if (this.state.timer === 0) {
                    this.setState({ gameOver: true });
                }
            },
            500
        );
    }
    stopTimer = () => {
        clearInterval(this.timerInterval);
    }
    roundInterlude = () => {
        this.roundInterval = setInterval(
            () => {
                if (this.state.roundTimer > 0) {
                    this.setState((prev) => ({ roundTimer: prev.roundTimer -= 1 }));
                } else {
                    clearInterval(this.roundInterval);
                    this.loadRound();
                }
            },
            1000
        );

    }
    loadRound = () => {
        this.setState({ baconClicked: false, eggClicked: false, roundTimer: 3, roundOver: false });
        this.startTimer();
        let baconTop = (Math.floor(Math.random() * 100) + 1).toString() + "%",
            baconLeft = (Math.floor(Math.random() * 100) + 1).toString() + "%",
            eggTop = (Math.floor(Math.random() * 100) + 1).toString() + "%",
            eggLeft = (Math.floor(Math.random() * 100) + 1).toString() + "%",
            baconTimer = Math.floor(Math.random() * 1000),
            eggTimer = Math.floor(Math.random() * 1000);


        setTimeout(() => {
            this.setState({ baconClass: "show " + this.state.colors[Math.floor(Math.random() * 2) + 1], baconTop: baconTop, baconLeft: baconLeft })
        }, baconTimer);

        setTimeout(() => {
            this.setState({ eggClass: "show " + this.state.colors[Math.floor(Math.random() * 2) + 1], eggTop: eggTop, eggLeft: eggLeft })
        }, eggTimer);
    }
    _start = () => {
        this.setState({ started: true, round: 1, timer: 100, gameOver: false, eggClass: "", baconClass: "" });
        this.loadRound();
    }
    _baconClicked = () => {
        this.setState({ baconClicked: true });
    }
    _eggClicked = () => {
        if (this.state.baconClicked) {
            clearInterval(this.timerInterval)
            this.setState((prev) => ({ round: prev.round += 1, roundOver: true, eggClass: "", baconClass: "" }),
                () => {
                    this.stopTimer();
                    this.roundInterlude();
                });

        } else {
            this.setState({ gameOver: true });
        }
    }
    render() {
        let content = ""
        if (this.state.gameOver) {
            content = <div className="center-page-wrapper">
                <div className="center-wrapper-group">
                    <h1>GAME OVER</h1>
                    <h2>SCORE: {this.state.round}</h2>
                    <button onClick={this._start} className="experiment-button">RETRY?</button>
                </div>
            </div>
        }
        else if (!this.state.started) {
            content = <div className="center-page-wrapper">
                <button onClick={this._start} className="experiment-button">START</button>
            </div>
        }
        else if (this.state.roundOver) {
            content = <div className="center-page-wrapper center-wrapper-group">
                <h1>ROUND: {this.state.round}</h1>
                <h1>{this.state.roundTimer}</h1>
            </div>
        }
        else {
            content = <div>
                <div className="space-between-wrapper">
                    <h3>Timer: {this.state.timer}</h3>
                    <h3>Round: {this.state.round}</h3>
                </div>
                <div onClick={this._baconClicked} style={{ top: this.state.baconTop, left: this.state.baconLeft }} className={"bacon " + this.state.baconClass}>Bacon</div>
                <div onClick={this._eggClicked} style={{ top: this.state.eggTop, left: this.state.eggLeft }} className={"egg " + this.state.eggClass}>Egg</div>
            </div>
        }
        return (
            <div className="bacon-wrapper">{content}</div>

        );
    }
}

export default BaconEgg