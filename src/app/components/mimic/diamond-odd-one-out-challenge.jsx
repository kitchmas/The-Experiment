import React from 'react';

import shuffle from '../../helpers/shuffle.js'

import Diamond  from '../diamond/diamond.jsx';
import '../../content/css/diamond-animation.css';

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

        clickOrder = shuffle(clickOrder);
        clickOrder = clickOrder.slice(1);

        if (this.state.round === 2) {
            clickOrder = [...clickOrder, ...clickOrder];
            shuffle(clickOrder);
        } else if (this.state.round === 3) {
            clickOrder = [...clickOrder, ...clickOrder, ...clickOrder];
            shuffle(clickOrder);
        }

        this.setState({
            clickOrder: clickOrder,
            currentClickOrder: []
        }, () => {
            this.playAnimation();
        });

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
        if (!this.setState.locked) {
            let currentClickOrder = [...this.state.currentClickOrder, 0];
            this.setState({
                animateDiamondClass: "play-red",
                currentClickOrder: currentClickOrder
            }, () => {
                this.checkSuccess();
            });
        }
    }
    blueClicked = () => {
        if (!this.setState.locked) {
            let currentClickOrder = [...this.state.currentClickOrder, 1]
            this.setState({
                animateDiamondClass: "play-blue",
                currentClickOrder: currentClickOrder
            }, () => {
                this.checkSuccess();
            });
        }
    }
    greenClicked = () => {
        if (!this.setState.locked) {
            let currentClickOrder = [...this.state.currentClickOrder, 2]
            this.setState({
                animateDiamondClass: "play-green",
                currentClickOrder: currentClickOrder
            }, () => {
                this.checkSuccess();
            });
        }
    }

    blackClicked = () => {
        if (!this.setState.locked) {
            let currentClickOrder = [...this.state.currentClickOrder, 3]
            this.setState({
                animateDiamondClass: "play-black",
                currentClickOrder: currentClickOrder
            }, () => {
                this.checkSuccess();
            });
        }
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <Diamond
                    wrapperId="rotated-black"
                    wrapperClass={this.state.animateDiamondClass}
                    topDiamondClass="diamond-red"
                    rightDiamondClass="diamond-blue"
                    leftDiamondClass="diamond-green"
                    bottomDiamondClass="diamond-black"
                    topDiamondClicked={this.redClicked}
                    rightDiamondClicked={this.blueClicked}
                    leftDiamondClicked={this.greenClicked}
                    bottomDiamondClicked={this.blackClicked} />
            </div>
        );
    }
};

export default DiamondOddOneOutChallenge