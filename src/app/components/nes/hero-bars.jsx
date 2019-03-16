import React from 'react';

class HeroBars extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="hero-bars">
            <progress className="nes-progress is-error" display={this.props.health + "/" + this.props.maxHealth} value={this.props.health} max="100"></progress>
            <progress className="nes-progress is-warning" display={this.props.attack + "/" + this.props.maxAttack} value={this.props.attack} max="30"></progress>
            <progress className="nes-progress is-primary" display={this.props.stamina + "/" + this.props.maxStamina}  value={this.props.stamina} max="100"></progress>
          </div>
        );
    }
}

export default HeroBars