import React from 'react';

class HeroBars extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="hero-bars nes-container with-title">
                <span className="title">{this.props.name} Lvl:{this.props.level}</span>
                <div className="bar-wrapper">
                    <label className="hero-health-bar-label">Health: {this.props.health + "/" + this.props.maxHealth}</label>
                    <progress className="nes-progress is-error" value={this.props.health} max={this.props.maxHealth}></progress>
                </div>
                <div className="bar-wrapper">
                    <label>Attack: {this.props.attack + "/" + this.props.maxAttack}</label>
                    <progress className={"nes-progress is-warning " + this.props.attackChargeClass} value={this.props.attack} max={this.props.maxAttack}></progress>
                </div>
                <div className="bar-wrapper">
                    <label>Stamina: {this.props.stamina + "/" + this.props.maxStamina}</label>
                    <progress className={"nes-progress is-primary " + this.props.staminaChargeClass} value={this.props.stamina} max={this.props.maxStamina}></progress>
                </div>
            </div>
        );
    }
}

export default HeroBars