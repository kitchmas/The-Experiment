import React from 'react';

class HeroButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="item hero-buttons ">
                {this.props.clickOnly ?
                    <React.Fragment>
                        <button type="button" className="nes-btn is-error"
                            onClick={this.props.heal}>
                            {this.props.healButtonText}</button>
                        <button type="button" className={"nes-btn is-primary " + this.props.staminaChargeClass}
                            onClick={this.props.charge}>
                            {this.props.staminaButtonText}</button>
                        <button type="button" className={"nes-btn is-warning " + this.props.attackChargeClass}
                            onClick={this.props.chargeAttack}>
                            {this.props.chargeAttackButtonText}</button>
                        <button type="button" className={this.props.attacking ? "nes-btn is-success is-disabled " : "nes-btn is-success "}
                            disabled={this.props.attacking}
                            onClick={this.props.attack}>
                            {this.props.attackButtonText}</button></React.Fragment>
                    :
                    <React.Fragment>
                        <button type="button" className="nes-btn is-error"
                            onMouseDown={this.props.heal}
                            onTouchStart={this.props.heal}
                            onMouseUp={this.props.stopHealing}
                            onMouseLeave={this.props.stopHealing}
                            onTouchEnd={this.props.stopHealing}>
                            {this.props.healButtonText}</button>
                        <button type="button" className={"nes-btn is-primary " + this.props.staminaChargeClass}
                            onMouseDown={this.props.charge}
                            onTouchStart={this.props.charge}
                            onMouseUp={this.props.stopCharging}
                            onMouseLeave={this.props.stopCharging}
                            onTouchEnd={this.props.stopCharging}>
                            {this.props.staminaButtonText}</button>
                        <button type="button" className={"nes-btn is-warning " + this.props.attackChargeClass}
                            onMouseDown={this.props.chargeAttack}
                            onTouchStart={this.props.chargeAttack}
                            onMouseUp={this.props.stopChargingAttack}
                            onMouseLeave={this.props.stopChargingAttack}
                            onTouchEnd={this.props.stopChargingAttack}>
                            {this.props.chargeAttackButtonText}</button>
                        <button type="button" className={this.props.attacking ? "nes-btn is-success is-disabled " : "nes-btn is-success "}
                            disabled={this.props.attacking}
                            onClick={this.props.attack}>
                            {this.props.attackButtonText}</button></React.Fragment>
                }
            </div>
        );
    }
}

export default HeroButtons