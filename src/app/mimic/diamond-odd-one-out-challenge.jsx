import React from 'react';

import { Diamond } from '../diamond/diamond.jsx';
import '../content/css/diamond-light-up-animation.css';

class DiamondOddOneOutChallenge extends React.Component {
    state = {
        clickOrder: [],
        currentClickOrder: [],
        animateDiamondClass: "",
        round: 1,
        locked: true,
    }
    animateDiamondClassColors = ["play-red-inf", "play-blue-inf", "play-green-inf", "play-black-inf"];
    componentDidMount = () => {
        this.setState({
            animateDiamondClass: "rotate-to-black",
        }, () => {
            setTimeout(() => {
                this.resetGame();
            }, 4000);
        });
    }

    playAnimation = () => {
        var that = this;
        that.setState({ locked: true });

        for (var i = 0; i <= that.state.clickOrder.length; i++) {
            (function (i) {
                var color = that.animateDiamondClassColors[that.state.clickOrder[i]];
                setTimeout(function () {
                    if (i === that.state.clickOrder.length) {
                        that.setState({
                            animateDiamondClass: " "
                        })
                    }
                    if (i === (that.state.clickOrder.length - 1)) {
                        that.setState({
                            animateDiamondClass: color,
                            locked: false
                        })
                    }
                    else {
                        that.setState({
                            animateDiamondClass: color
                        })
                    }
                }, i * 1000);
            })(i)
        }
    }
    resetGame = () => {
        var clickOrder = [0, 1, 2, 3];

        clickOrder = this.shuffle(clickOrder);
        clickOrder = clickOrder.slice(1);

        if (this.state.round === 2) {
            clickOrder = [...clickOrder, ...clickOrder];
            this.shuffle(clickOrder);
        } else if (this.state.round === 3) {
            clickOrder = [...clickOrder, ...clickOrder, ...clickOrder];
            this.shuffle(clickOrder);
        }

        this.setState({
            clickOrder: clickOrder,
            currentClickOrder: []
        }, () => {
            this.playAnimation();
        });

    }
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    checkSuccess = () => {
        if (this.state.clickOrder.indexOf(this.state.currentClickOrder[0]) === -1) {
            this.gameWin();
        } else {
            this.gameOver();
        }
    }
    gameWin = () => {
        var nextRound = this.state.round;
        ++nextRound;
        if (nextRound < 4) {
            this.setState({
                animateDiamondClass: "success",
                round: nextRound
            });
            setTimeout(() => {
                this.resetGame();
            }, 1000);
        } else {
            alert("WINNNNAR");
        }
    }
    gameOver = () => {
        this.setState({
            animateDiamondClass: "failure",
            currentClickOrder: []
        });
        setTimeout(() => {
            this.playAnimation();
        }, 1000);
    }
    redClicked = () => {
        let currentClickOrder = [...this.state.currentClickOrder, 0];
        this.setState({
            animateDiamondClass: "play-red",
            currentClickOrder: currentClickOrder
        }, () => {
            this.checkSuccess();
        });
    }
    blueClicked = () => {
        let currentClickOrder = [...this.state.currentClickOrder, 1]
        this.setState({
            animateDiamondClass: "play-blue",
            currentClickOrder: currentClickOrder
        }, () => {
            this.checkSuccess();
        });
    }
    greenClicked = () => {
        let currentClickOrder = [...this.state.currentClickOrder, 2]
        this.setState({
            animateDiamondClass: "play-green",
            currentClickOrder: currentClickOrder
        }, () => {
            this.checkSuccess();
        });
    }
    blackClicked = () => {
        let currentClickOrder = [...this.state.currentClickOrder, 3]
        this.setState({
            animateDiamondClass: "play-black",
            currentClickOrder: currentClickOrder
        }, () => {
            this.checkSuccess();
        });
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <Diamond
                    stageWrapperId="rotated-black"
                    animateDiamondClass={this.state.animateDiamondClass}
                    locked={this.state.locked}
                    redClicked={this.redClicked}
                    blueClicked={this.blueClicked}
                    greenClicked={this.greenClicked}
                    blackClicked={this.blackClicked} />
            </div>
        );
    }
};

export { DiamondOddOneOutChallenge }