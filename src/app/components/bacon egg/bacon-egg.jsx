import React from 'react';

import '../../../content/css/bacon-eggs.css';

class BaconEgg extends React.Component {
    state = {
        started: false,
        timer: 60,
        round: 1,
        roundTimer: 3,
        roundOver: false,
        bacon: false,
        egg: false,
        and: false,
        baconClass: "",
        baconTop: "",
        baconLeft: "",
        baconClicked: false,
        eggClass: "",
        eggTop: "",
        eggLeft: "",
        eggClicked: false,
        andClass: "",
        andTop: "",
        andLeft: "",
        andClicked: false,
        patterns: [
            "red", "yellow",
            "black", "vertical",
            "upside-down", "large",
            "medium", "small",
            "angle-1", "angle-2",
            "angle-3", "angle-4",
            "top-to-bottom", "left-to-right"]
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
                    this.gameOver();
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
            500
        );

    }
    loadRound = () => {
        let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth,
        leftMaxValue = 80,
        leftMediumOrLargeMaxValue = 50;
        
        if(width < 760){
            leftMaxValue = 56;
            leftMediumOrLargeMaxValue = 25;
        }
        
        if(width < 400){
            leftMaxValue = 56;
            leftMediumOrLargeMaxValue = 10;
        }

        this.setState({ baconClicked: false, eggClicked: false, andClicked: false, roundTimer: 3, roundOver: false });
        this.startTimer();
        let baconTop = (Math.floor(Math.random() * 80) + 1).toString() + "%",
            baconLeft = (Math.floor(Math.random() * leftMaxValue) + 1).toString() + "%",
            eggTop = (Math.floor(Math.random() * 80) + 1).toString() + "%",
            eggLeft = (Math.floor(Math.random() * leftMaxValue) + 1).toString() + "%",
            andTop = (Math.floor(Math.random() * 80) + 1).toString() + "%",
            andLeft = (Math.floor(Math.random() * leftMaxValue) + 1).toString() + "%",
            baconTimer = Math.floor(Math.random() * 1000),
            eggTimer = Math.floor(Math.random() * 1000),
            andTimer = Math.floor(Math.random() * 1000),
            baconClass = "",
            eggClass = "",
            andClass = "";

        if (this.state.round > 2) {
            baconClass = this.state.patterns[Math.floor(Math.random() * this.state.patterns.length - 1) + 1],
                eggClass = this.state.patterns[Math.floor(Math.random() * this.state.patterns.length - 1) + 1],
                andClass = this.state.patterns[Math.floor(Math.random() * this.state.patterns.length - 1) + 1];
        }

        if (baconClass === "large" || baconClass === "medium") {
            baconLeft = (Math.floor(Math.random() * leftMediumOrLargeMaxValue) + 1).toString() + "%";
        }

        if (eggClass === "large" || eggClass === "medium") {
            eggLeft = (Math.floor(Math.random() * leftMediumOrLargeMaxValue) + 1).toString() + "%";;
        }

        if (andClass === "large" || andClass === "medium") {
            andLeft = (Math.floor(Math.random() * leftMediumOrLargeMaxValue) + 1).toString() + "%";;
        }

        setTimeout(() => {
            this.setState({ baconClass: "show " + baconClass, baconTop: baconTop, baconLeft: baconLeft })
        }, baconTimer);

        setTimeout(() => {
            this.setState({ eggClass: "show " + eggClass, eggTop: eggTop, eggLeft: eggLeft })
        }, eggTimer);

        setTimeout(() => {
            this.setState({ andClass: "show " + andClass, andTop: andTop, andLeft: andLeft })
        }, andTimer);
    }
    roundWon() {
        this.stopTimer();
        setTimeout(() => {
            this.setState((prev) => ({ round: prev.round += 1, roundOver: true, eggClass: "", baconClass: "", andClass: "" }),
                () => {
                    this.roundInterlude();
                });
        }, 1000)
    }
    gameOver() {
        this.stopTimer();
        this.setState({ gameOver: true });
    }
    _start = () => {
        this.setState({ started: true, round: 1, timer: 60, gameOver: false, eggClass: "", baconClass: "" });
        this.loadRound();
    }
    _baconClicked = () => {
        this.setState({ baconClicked: true, baconClass: "" });
    }
    _andClicked = () => {
        this.setState({ andClicked: true, andClass: "" }, () => {
            if (!this.state.baconClicked)
                this.gameOver();
        });
    }
    _eggClicked = () => {
        this.setState({ eggClicked: true, eggClass: "" }, () => {
            if (this.state.baconClicked && this.state.andClicked) {
                this.roundWon();
            } else {
                this.gameOver();
            }
        });
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
            content = <div className="center-page-wrapper  center-wrapper-group">
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
                <h1 className="center-text"> <span className="bacon-text">{this.state.baconClicked ? "Bacon" : ""}</span> <span className="and-text">{this.state.andClicked ? "and" : ""}</span> <span className="egg-text">{this.state.eggClicked ? "Eggs" : ""}</span></h1>
                <div onMouseDown={this._baconClicked} onTouchStart={this._baconClicked} style={{ top: this.state.baconTop, left: this.state.baconLeft }} className={"ingredient bacon " + this.state.baconClass}>Bacon</div>
                <div onMouseDown={this._eggClicked} onTouchStart={this._eggClicked} style={{ top: this.state.eggTop, left: this.state.eggLeft }} className={"ingredient egg " + this.state.eggClass}>Eggs</div>
                <div onMouseDown={this._andClicked} onTouchStart={this._andClicked} style={{ top: this.state.andTop, left: this.state.andLeft }} className={"ingredient and " + this.state.andClass}>and</div>
            </div>
        }
        return (
            <div className="bacon-wrapper">
                {content}
            </div>

        );
    }
}

export default BaconEgg