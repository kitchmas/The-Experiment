import React from 'react';

import '../content/css/diamond.css';

class Diamond extends React.Component {
    handleRedClicked = (e) => {
        if (!this.props.locked) {
            this.props.redClicked();
        }
    }
    handleBlueClicked = (e) => {
        if (!this.props.locked) {
            this.props.blueClicked();
        }
    }
    handleGreenClicked = (e) => {
        if (!this.props.locked) {
            this.props.greenClicked();
        }
    }
    handleBlackClicked = (e) => {
        if (!this.props.locked) {
            this.props.blackClicked();
        }
    }
    render() {
        return (
            <div id={this.props.stageWrapperId} className={this.props.animateDiamondClass + ' diamond-wrapper'}>
                <div onClick={this.handleRedClicked} className="diamond diamond-red">
                </div>
                <div onClick={this.handleBlueClicked} className="diamond diamond-blue">
                </div>
                <div onClick={this.handleGreenClicked} className="diamond diamond-green">
                </div>
                <div onClick={this.handleBlackClicked} className="diamond diamond-black">
                </div>
            </div>);
    }
}

export { Diamond }













