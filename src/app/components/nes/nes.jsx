import React from 'react';
import '../../../content/css/nes-test.css';
import Monster from '../nes/monster.jsx';

class Nes extends React.Component {
  state = {
    started: false,
    monsterName: "",
    monsterHealth: 0,
    monsterMaxHealth: 0,
    monsterAttack: 0,
    monsterStamina: 0,
    monsterMaxStamina: 0,
    monsterStaminaRecoveryRate: 0,
    monsterClassName: "",
    heroHealth: 100,
    heroStamina: 100,
    heroAttack: 0,
    attacking: false,
    monsters: [{ name: "Mario", health: 100, attack: 20, staminaRecoveryRate: 60, className: "nes-mario" },
    { name: "Ash", health: 120, attack: 30, staminaRecoveryRate: 50, className: "nes-ash" },
    { name: "Poké Ball", health: 140, attack: 10, staminaRecoveryRate: 25, className: "nes-pokeball" },
    { name: "Bulbasaur", health: 160, attack: 40, staminaRecoveryRate: 80, className: "nes-bulbasaur" },
    { name: "Charmander", health: 180, attack: 45, staminaRecoveryRate: 70, className: "nes-charmander" },
    { name: "Squirtle", health: 220, attack: 50, staminaRecoveryRate: 200, className: "nes-squirtle" },
    { name: "Kirby", health: 330, attack: 90, staminaRecoveryRate: 500, className: "nes-kirby" }]
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    clearInterval(this.attackTimer);
    clearInterval(this.chargeTimer);
    clearInterval(this.monsterTimer);
    clearInterval(this.healTimer);
    clearInterval(this.chargeAttackTimer);
  }
  startGame = () => {
    this.loadMonster();
  }
  loadMonster = () => {
    let nextMonster;
    if (this.state.started && this.state.monsterName != "") {
      const index = this.state.monsters.findIndex(item => item.name === this.state.monsterName);
      if (index === -1) {
        //GAME OVER WINNER BOI
      }
      nextMonster = this.state.monsters[index + 1];
    } else {
      nextMonster = this.state.monsters[0];
    }
    this.setState({
      started: true,
      monsterName: nextMonster.name,
      monsterHealth: nextMonster.health,
      monsterMaxHealth: nextMonster.health,
      monsterAttack: nextMonster.attack,
      monsterStamina: 0,
      monsterMaxStamina: 100,
      monsterStaminaRecoveryRate: nextMonster.staminaRecoveryRate,
      monsterClassName: nextMonster.className
    }, () => {
      this.activateMonster();
    });
  }
  activateMonster = () => {
    if (!this.monsterTimer) {
      this.monsterTimer = setInterval(() => {
        if (this.state.monsterStamina === 100 && this.state.monsterHealth > 0) {
          this.setState((prev) => ({
            monsterStamina: 0
          }));
          this.monsterAttack();
        } else if (this.state.monsterStamina < 100 && this.state.monsterHealth > 0) {
          this.setState((prev) => ({ monsterStamina: prev.monsterStamina + 1 }));
        } else if (this.state.monsterHealth <= 0) {
          clearInterval(this.monsterTimer);
        }
      },
        this.state.monsterStaminaRecoveryRate)
    }
  }
  stopMonster = () => {
    if (this.monsterTimer) {
      clearInterval(this.monsterTimer);
      this.monsterTimer = null;
    }
  }
  monsterKilled = () => {
    //TODO show results maybe add level up type thing
    setTimeout(() => {
      this.setState({
        heroStamina: 100,
        heroHealth: 100,
        attacking: false
      }, this.activateMonster)
    }, 2000)
  }
  monsterAttack = () => {
    let attackDamage = this.state.monsterAttack;
    this.monsterAttackTimer = setInterval(
      () => {
        if (attackDamage > 0) {
          this.setState((prev) => ({
            heroHealth: prev.heroHealth - 1,
          }));
        }
        else {
          clearInterval(this.monsterAttackTimer);
        }
        attackDamage--;
      },
      10
    );
  }
  _attack = () => {
    if (!this.state.started) {
      this.startGame();
    } else {
      if (this.state.heroAttack > 0) {
        if (this.state.heroAttack > 0 && this.state.monsterStamina > 94 ) {
          this.setState((prev) => ({
            heroAttack: prev.heroAttack/2,
            monsterStamina: 0
          }));
        }
        this.stopMonster();
      } else {
        return;
      }
      this.attackTimer = setInterval(
        () => {
          if (this.state.heroAttack === 0)
              this._stopAttacking();

            if (this.state.monsterHealth <= 0) {
              clearInterval(this.attackTimer);
              this.monsterKilled();
            } else if (this.state.heroAttack > 0 && this.state.monsterStamina > 0) {
              this.setState((prev) => ({
                heroAttack: prev.heroAttack - 1,
                monsterStamina: prev.monsterStamina - 1
              }));
            }
            else if (this.state.heroAttack > 0 && this.state.monsterStamina === 0) {
              this.setState((prev) => ({
                heroAttack: prev.heroAttack - 1,
                monsterHealth: prev.monsterHealth - 1
              }));
            }
        },
        100
      );
    }
  }
  _stopAttacking = () => {
    clearInterval(this.attackTimer);
    this.activateMonster();
  }
  _charge = () => {
    if (!this.state.started) {
      this.startGame();
    } else {
      this.chargeTimer = setInterval(
        () => {
          if (this.state.heroStamina < 100) {
            this.setState((prev) => ({
              heroStamina: prev.heroStamina + 1
            }));
          }
        },
        100
      );
    }
  }
  _stopCharging = () => {
    clearInterval(this.chargeTimer);
  }
  _heal = () => {
    if (!this.state.started) {
      this.startGame();
    } else {
      this.healTimer = setInterval(
        () => {
          if (this.state.heroHealth < 100 && this.state.heroStamina > 0) {
            this.setState((prev) => ({
              heroHealth: prev.heroHealth + 1,
              heroStamina: prev.heroStamina - 1
            }));
          }
        },
        100
      );
    }
  }
  _stopHealing = () => {
    clearInterval(this.healTimer);
  }
  _chargeAttack = () => {
    if (!this.state.started) {
      this.startGame();
    } else {
      this.chargeAttackTimer = setInterval(
        () => {
          if (this.state.heroAttack < 100 && this.state.heroStamina > 0) {
            this.setState((prev) => ({
              heroAttack: prev.heroAttack + 1,
              heroStamina: prev.heroStamina - 1
            }));
          }
        },
        100
      );
    }
  }
  _stopChargingAttack = () => {
    clearInterval(this.chargeAttackTimer);
  }
  render() {
    return (
      <div className="content-wrapper nes-content">
        <section className="nes-container with-title game-box">
          <h3 className="title">Title</h3>
          <div className="item">
            <div className="game-screen nes-container">
              {!this.state.started ? <div className="start-screen">
                PRESS ANY BUTTON TO START
              </div>
                :
                <Monster health={this.state.monsterHealth}
                  maxHealth={this.state.monsterMaxHealth}
                  stamina={this.state.monsterStamina}
                  maxStamina={this.state.monsterMaxStamina}
                  className={this.state.monsterClassName}
                  name={this.state.monsterName} />
              }
              <div className="hero-bars">
                <progress className="nes-progress is-error" value={this.state.heroHealth} max="100"></progress>
                <progress className="nes-progress is-warning" value={this.state.heroAttack} max="100"></progress>
                <progress className="nes-progress is-primary" value={this.state.heroStamina} max="100"></progress>
              </div>
            </div>
          </div>
          <div className="item hero-buttons">
            {this.state.heroHealth <= 0 ? <div>You lose</div> : ""}
            <button type="button" className="nes-btn is-primary"
              onMouseDown={this._charge}
              onTouchStart={this._charge}
              onMouseUp={this._stopCharging}
              onMouseLeave={this._stopCharging}
              onTouchEnd={this._stopCharging}>
              Charge
              Stamina</button>
              <button type="button" className="nes-btn is-warning"
              onMouseDown={this._chargeAttack}
              onTouchStart={this._chargeAttack}
              onMouseUp={this._stopChargingAttack}
              onMouseLeave={this._stopChargingAttack}
              onTouchEnd={this._stopChargingAttack}>
              Charge Attack</button>
            <button type="button" className="nes-btn is-success"
              onMouseDown={this._attack}
              onTouchStart={this._attack}
              onMouseUp={this._stopAttacking}
              onMouseLeave={this._stopAttacking}
              onTouchEnd={this._stopAttacking}>
              Attack</button>
            <button type="button" className="nes-btn is-error"
              onMouseDown={this._heal}
              onTouchStart={this._heal}
              onMouseUp={this._stopHealing}
              onMouseLeave={this._stopHealing}
              onTouchEnd={this._stopHealing}>
              Heal</button>
          </div>
        </section>
      </div>
    )
  }
}

export default Nes