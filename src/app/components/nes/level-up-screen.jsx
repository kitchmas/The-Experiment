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
                        <i class="nes-icon is-large heart"></i>
                        <span>Health + {this.props.healthValue}</span>
                    </div>
                    <div onClick={this.props.levelUpAttack}>
                        <i class="nes-icon is-large star"></i>
                        <span>Attack + 10 {this.props.AttackValue}</span>
                    </div>
                    <div onClick={this.props.levelUpStamina}>
                        <i class="nes-icon coin is-large"></i>
                        <span>Stamina + {this.props.StaminaValue}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LevelUpScreen