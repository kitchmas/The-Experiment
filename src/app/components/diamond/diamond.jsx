import React from 'react';

import '../../content/css/diamond.css';


class Diamond extends React.Component {
    mainDiamondClicked = () => {
        if (this.props.mainDiamondClicked)
        this.props.mainDiamondClicked()
    }
    topDiamondClicked = () => {
        if (this.props.topDiamondClicked)
        this.props.topDiamondClicked()
    }
    rightDiamondClicked = () => {
        if (this.props.rightDiamondClicked)
        this.props.rightDiamondClicked()
    }
    leftDiamondClicked = () => {
        if (this.props.leftDiamondClicked)
        this.props.leftDiamondClicked()
    }
    bottomDiamondClicked = () => {
        if (this.props.bottomDiamondClicked)
            this.props.bottomDiamondClicked()
    }
    render() {
        return (
            <React.Fragment>
                <div onClick={this.mainDiamondClicked} id={this.props.wrapperId ? this.props.wrapperId : ""} className={this.props.wrapperClass ? this.props.wrapperClass+ " diamond-holder": "" + " diamond-holder"} >
                    <div onClick={this.topDiamondClicked} className={this.props.topDiamondClass + " diamond"}></div>
                    <div onClick={this.rightDiamondClicked} className={this.props.rightDiamondClass + " diamond"}></div>
                    <div onClick={this.leftDiamondClicked} className={this.props.leftDiamondClass + " diamond"}></div>
                    <div onClick={this.bottomDiamondClicked} className={this.props.bottomDiamondClass + " diamond"}></div>
                </div>
                {this.props.children}
            </React.Fragment>
            );

    }
}

export default Diamond













