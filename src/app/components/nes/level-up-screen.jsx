import React from 'react';

class LevelUpScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="level-up-screen">
                <h1>LEVEL UP</h1>
                <p>Choose a bonus</p>
                <div className="level-up-options">
                    <div onClick={this.props.levelUpHealth}>
                        <h4>Health</h4>
                        <i className="nes-icon is-large heart"></i>
                        <span>{this.props.healthValue.type === "speed" ? "Speed +" + this.props.healthValue.value + "%" : "Points +" + this.props.healthValue.value}</span>
                    </div>
                    <div onClick={this.props.levelUpStamina}>
                        <h4>Stamina</h4>
                        <i className="nes-icon coin is-large"></i>
                        <span>{this.props.staminaValue.type === "speed" ? "Speed +" + this.props.staminaValue.value + "%" : "Points +" + this.props.staminaValue.value}</span>
                    </div>
                    <div onClick={this.props.levelUpAttack}>
                        <h4>Attack</h4>
                        <i className="nes-icon is-large star"></i>
                        <span>{this.props.attackValue.type === "speed" ? "Speed +" + this.props.attackValue.value + "%" : "Points +" + this.props.attackValue.value}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LevelUpScreen