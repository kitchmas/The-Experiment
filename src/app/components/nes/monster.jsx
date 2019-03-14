import React from 'react';

class Monster extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="monster-bars">
                    <span>{this.props.name}</span>
                    <progress className="nes-progress is-error" value={this.props.health} max={this.props.maxHealth}></progress>
                    <progress className="nes-progress is-warning" value={this.props.stamina} max={this.props.maxStamina}></progress>
                </div>
                <div className="monster-box ">
                    {this.props.health <= 0 ? <div>Dead</div> : <i className={"monster " + this.props.className}></i>}
          </div>
        </div>
        );
    }
}

export default Monster