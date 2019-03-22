import React from 'react';

class HeroBars extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="hero-bars nes-container with-title">
                <div className="title">
                    <span>{this.props.name} </span>
                    <span>Lvl:{this.props.level}</span>
                </div>
                <progress className="nes-progress is-error" display={this.props.health + "/" + this.props.maxHealth} value={this.props.health} max={this.props.maxHealth}></progress>
                <progress className={"nes-progress is-warning " + this.props.attackChargeClass} display={this.props.attack + "/" + this.props.maxAttack} value={this.props.attack} max={this.props.maxAttack}></progress>
                <progress className={"nes-progress is-primary " + this.props.staminaChargeClass} display={this.props.stamina + "/" + this.props.maxStamina} value={this.props.stamina} max={this.props.maxStamina}></progress>
            </div>
        );
    }
}

export default HeroBars