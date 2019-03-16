import React from 'react';

class Monster extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div className="monster-bars">
                    <span>{this.props.name}</span>
                    <progress className="nes-progress is-error"  
                    display={this.props.health + "/" + this.props.maxHealth}
                     value={this.props.health} max={this.props.maxHealth}></progress>
                    <progress className={this.props.stamina > 94 ? "nes-progress is-warning critical-hit" :"nes-progress is-warning"}
                    display={this.props.stamina + "/" + this.props.maxStamina}
                    value={this.props.stamina} max={this.props.maxStamina}></progress>
                </div>
                <div className="monster-box ">
                    {this.props.health <= 0 ? <div>Dead</div> : <i className={"monster " + this.props.className}></i>}
          </div>
          </React.Fragment>
        );
    }
}

export default Monster