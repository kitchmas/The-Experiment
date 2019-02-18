import React from 'react';
const Link = require('react-router-dom').Link;

import shuffle from '../../helpers/shuffle.js'

import Diamond from '../diamond/diamond.jsx';
import '../../../content/css/diamond-animation.css';


class DiamondCopyChallenge extends React.Component {
    constructor(props) {
        super(props);
    }
    _isMounted = false;
    state = {
        clickOrder: [],
        currentClickOrder: [],
        animateDiamondClass: "grow",
        round: 1,
        locked: true
    }
    animateDiamondClassColors = ["play-red-inf", "play-blue-inf", "play-green-inf", "play-black-inf"];
    componentDidMount = () => {
        this._isMounted = true;
        setTimeout(() => {
            if (this._isMounted) {
                this.resetGame();
            }
        }, 5000);
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        var availableClicks = [0, 1, 2, 3],
            clickOrder = [];

        for (var i = 0; i < this.state.round; i++) {
            clickOrder = [...clickOrder, ...availableClicks]
        }

        clickOrder = shuffle(clickOrder);

        if (this.state.round > 1) {
            if (this.state.round === 2) {
                clickOrder = clickOrder.slice(3);
            } else if (this.state.round === 3) {
                clickOrder = clickOrder.slice(6);
            }
        }
        this.setState({
            clickOrder: clickOrder,
            currentClickOrder: []
        }, () => {
            this.playAnimation();
        });

    }
    checkSuccess = () => {
        for (let i = 0; i < this.state.currentClickOrder.length; i++) {
            if (this.state.currentClickOrder[i] !== this.state.clickOrder[i]) {
                this.gameOver();
                break;
            }
            if (i === (this.state.clickOrder.length - 1)) {
                this.gameWin();
                break;
            }
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
            setTimeout(() => {
                this.props.history.push("/mimic/2")
            }, 1000);

        }
    }
    gameOver = () => {
        this.setState({
            animateDiamondClass: "failure",
            currentClickOrder: []
        }, () => {
            setTimeout(() => {
                this.playAnimation();
            }, 1000);
        });
    }
    redClicked = () => {
        if (!this.state.locked) {
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
        if (!this.state.locked) {
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
        if (!this.state.locked) {
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
        if (!this.state.locked) {
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
                <div>
                    <Diamond
                        wrapperId="grow"
                        wrapperClass={this.state.animateDiamondClass}
                        topDiamondClass="diamond-red"
                        rightDiamondClass="diamond-blue"
                        leftDiamondClass="diamond-green"
                        bottomDiamondClass="diamond-black"
                        topDiamondClicked={this.redClicked}
                        rightDiamondClicked={this.blueClicked}
                        leftDiamondClicked={this.greenClicked}
                        bottomDiamondClicked={this.blackClicked} />
                    <Link className="next" to="/mimic/2">
                        <h1>NEXT</h1>
                    </Link>
                </div>
            </div>
        );
    }
};

export default DiamondCopyChallenge