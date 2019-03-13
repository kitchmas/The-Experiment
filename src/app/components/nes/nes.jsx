import React from 'react';
import '../../../content/css/nes-test.css';

class Nes extends React.Component {
  state = {
    monsterHealth: 100,
    heroHealth: 100,
    heroStamina: 100,
    heroAttack: 10,
    attackCost: 20,
  }
  componentWillUnmount(){
    clearInterval(this.attackTimer);
}
  attack = () => {
    if (this.state.heroStamina >= this.state.attackCost) {
      this.setState((prev) => ({
        monsterHealth: prev.monsterHealth - this.state.heroAttack,
        heroStamina: prev.heroStamina - this.state.attackCost
      }));
    }
  }
  chargeStamina = (chargeStatus) => {
    this.attackTimer = setInterval(
      () => {
        if(this.state[chargeStatus] < 100){
          this.setState((prev) => ({
            [chargeStatus]: prev[chargeStatus] + 1
          }));
        }
       },
      100
    );
  }
  stopChargingStamina = () =>{
    debugger;
    clearInterval(this.attackTimer);
  }
  render() {
    return (
      <div className="content-wrapper nes-content">
        <section className="nes-container with-title game-box">
          <h3 className="title">Title</h3>
          <div className="item">
            <div className="game-screen nes-container">
              <div className="monster-bars">
                <span>Kirby</span>
                <progress className="nes-progress is-error" value={this.state.monsterHealth} max="100"></progress>
              </div>
              <div className="monster-box ">
                <i className="monster nes-kirby"></i>
              </div>
              <div className="hero-bars">
                <progress className="nes-progress is-primary" value={this.state.heroStamina} max="100"></progress>
                <progress className="nes-progress is-error" value={this.state.heroHealth} max="100"></progress>
              </div>
            </div>
          </div>
          <div className="item hero-buttons">
            <button onMouseDown={() => {this.chargeStamina("heroStamina")}} onTouchStart={() => {this.chargeStamina("heroStamina")}} onMouseUp={this.stopChargingStamina}  onTouchEnd={this.stopChargingStamina} type="button" className="nes-btn is-primary">Charge</button>
            <button onClick={this.attack} type="button" className="nes-btn is-success">Attack</button>
            <button onClick={this.heal} type="button" className="nes-btn is-error">Heal</button>
          </div>
        </section>
      </div>
    )
  }
}

export default Nes