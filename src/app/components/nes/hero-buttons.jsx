import React from 'react';

class HeroButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="item hero-buttons ">
                <button type="button" className="nes-btn is-primary"
                    onMouseDown={this.props.charge}
                    onTouchStart={this.props.charge}
                    onMouseUp={this.props.stopCharging}
                    onMouseLeave={this.props.stopCharging}
                    onTouchEnd={this.props.stopCharging}>
                    Charge
              Stamina</button>
                <button type="button" className="nes-btn is-warning"
                    onMouseDown={this.props.chargeAttack}
                    onTouchStart={this.props.chargeAttack}
                    onMouseUp={this.props.stopChargingAttack}
                    onMouseLeave={this.props.stopChargingAttack}
                    onTouchEnd={this.props.stopChargingAttack}>
                    Charge Attack</button>
                <button type="button" className={this.props.attacking ? "nes-btn is-success is-disabled" : "nes-btn is-success"}
                    disabled={this.props.attacking}
                    onClick={this.props.attack}>
                    Attack</button>
                <button type="button" className="nes-btn is-error"
                    onMouseDown={this.props.heal}
                    onTouchStart={this.props.heal}
                    onMouseUp={this.props.stopHealing}
                    onMouseLeave={this.props.stopHealing}
                    onTouchEnd={this.props.stopHealing}>
                    Heal</button>
            </div>
        );
    }
}

export default HeroButtons