import React from 'react';

import '../content/css/diamond.css';

class DiamondSorter extends React.Component {
    handleRedClicked = (e) => {
        if (this.props.locked === false && this.props.redClicked) {
                this.props.redClicked();
        }
    }
    handleBlueClicked = (e) => {
        if (this.props.locked === false && this.props.blueClicked) {
            this.props.blueClicked();
        }
    }
    handleGreenClicked = (e) => {
        if (this.props.locked === false && this.props.greenClicked) {
            this.props.greenClicked();
        }
    }
    handleBlackClicked = (e) => {
        if (this.props.locked === false && this.props.blackClicked) {
            this.props.blackClicked();
        }
    }
    render() {
        return (
            <div className={this.props.animateDiamondClass + ' diamond-holder'}>
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

export { DiamondSorter }













