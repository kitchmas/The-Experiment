import React from 'react';

class Monster extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div className="monster-bars bars-wrapper nes-container with-title">
                    <div className="bar-wrapper">
                        <label>Health: {this.props.health + "/" + this.props.maxHealth}</label>
                        <progress className="nes-progress is-error"
                            display={this.props.health + "/" + this.props.maxHealth}
                            value={this.props.health} max={this.props.maxHealth}></progress>
                    </div>
                    <span className="title">{this.props.name}</span>
                </div>
                <div className="monster-box ">
                    {this.props.health <= 0 ? <div>Dead</div> : <i className={"monster " + this.props.className + this.props.monsterStatusClass}></i>}
                </div>
            </React.Fragment>
        );
    }
}

export default Monster