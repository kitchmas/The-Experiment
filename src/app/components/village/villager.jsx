import React from 'react';

import '../../../content/css/villager.css';

class Villager extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        top: 0,
        left: 0,
        class: "",
        directions: ["left", "right", "up", "down"]
    }
    componentDidMount() {
        if (this.props.move) {
            this.setState({class:"invisible"})
            const top = Math.floor(Math.random() * (document.getElementsByClassName('village')[0].clientHeight - (this.props.zoom * 3))) + 1,
                left = Math.floor(Math.random() * (document.getElementsByClassName('village')[0].clientWidth - (this.props.zoom * 2))) + 1;

            this.setState({ top, left }, () => {
                this.show();
                this.takeFirstStep();
            });
        }
    }
    componentWillUnmount() {
        this.keepLooping = false;
    }
    show() {
        setTimeout(() => {
            this.setState({ class: "visible" });
        }, 100);
    }
    takeFirstStep() {
        setTimeout(() => {
            this.keepLooping = true;
            let that = this;
            (function ontimeout() {
                if (that.keepLooping) {
                    that.move();
                    setTimeout(ontimeout, Math.floor(Math.random() * 20000 + 5000) + 1);
                }
            })();
        }, Math.floor(Math.random() * 10000 + 2000) + 1);
    }
    move() {
        let direction = this.state.directions[Math.floor(Math.random() * this.state.directions.length - 1) + 1],
        w = document.getElementsByClassName('village')[0].clientWidth,
            h = document.getElementsByClassName('village')[0].clientHeight;

        switch (direction) {

            case "left":
                if (this.state.left - 100 < 0) {
                    this.setState((prev) => ({
                        left: prev.left + 100,
                        class: "side-on walking"
                    }));
                } else {
                    this.setState((prev) => ({
                        left: prev.left - 100,
                        class: "side-on walking"
                    }));
                }
                break;
            case "right":
                if (this.state.left + 100 >= (w - (this.props.zoom * 2))) {
                    this.setState((prev) => ({
                        left: prev.left - 100,
                        class: "side-on walking"
                    }));
                } else {
                    this.setState((prev) => ({
                        left: prev.left + 100,
                        class: "side-on walking"
                    }));
                }
                break;
            case "up":
                if (this.state.top - 100 < 0) {
                    this.setState((prev) => ({
                        top: prev.top + 100,
                        class: "walking"
                    }));
                } else {
                    this.setState((prev) => ({
                        top: prev.top - 100,
                        class: "backwards walking"
                    }));
                }
                break;
            case "down":
                if (this.state.top + 100 >= (h - (this.props.zoom * 3))) {
                    this.setState((prev) => ({
                        top: prev.top - 100,
                        class: "backwards walking"
                    }));
                } else {
                    this.setState((prev) => ({
                        top: prev.top + 100,
                        class: "walking"
                    }));
                }
                break;
            default:
                this.setState((prev) => ({
                    left: 0,
                    top: 0,
                    class: ""
                }));
        }
        setTimeout(() => {
            this.setState({ class: "blinking" });
        }, 5000)
    }
    _onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (!this.state.valid)
                this.validateFields();
        });
    }
    _getHeight = () => {
        return this.props.zoom * 3
    }
    _getWidth = () => {
        return this.props.zoom * 2
    }
    render() {
        return (
            <div style={{ top: this.state.top, left: this.state.left, height: this._getHeight(), width: this._getWidth() }} className={this.props.position + (this.props.move ? " villager move " : " villager ") + this.state.class}>
                <h2>Hi, I'm {this.props.name}</h2>
                <div className="head">
                    <div className={"hair " + this.props.hairStyle} style={{ backgroundColor: this.props.hairColour }}>
                    </div>
                    <div className="face" style={{ backgroundColor: this.props.skinColour }}>
                        <div className={"fringe " + this.props.hairStyle} style={{ backgroundColor: this.props.hairColour }}></div>
                        <div className="eyes">
                            <div className="eye"></div>
                            <div className="eye"></div>
                        </div>
                    </div>
                </div>
                <div className="upper-body">
                    <div className="arm">
                        <div className="sleeve" style={{ backgroundColor: this.props.shirtColour }}></div>
                        <div className="forearm" style={{ backgroundColor: this.props.skinColour }}></div>
                    </div>
                    <div className="torso" style={{ backgroundColor: this.props.shirtColour }}></div>
                    <div className="arm">
                        <div className="sleeve" style={{ backgroundColor: this.props.shirtColour }}></div>
                        <div className="forearm" style={{ backgroundColor: this.props.skinColour }}></div>
                    </div>
                </div>
                <div className="legs">
                    <div className="leg">
                        <div className="trouser-leg" style={{ backgroundColor: this.props.trouserColour }}></div>
                        <div className="shoe"></div>
                    </div>
                    <div className="leg">
                        <div className="trouser-leg" style={{ backgroundColor: this.props.trouserColour }}></div>
                        <div className="shoe"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Villager