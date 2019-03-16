import React from 'react';
import '../../../content/css/nes-test.css';
import Monster from '../nes/monster.jsx';
import HeroBars from '../nes/hero-bars.jsx';
import HeroButtons from '../nes/hero-buttons.jsx';
import StartScreen from '../nes/start-screen.jsx';

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
    heroMaxHealth: 100,
    heroHealth: 100,
    heroMaxStamina: 100,
    heroStamina: 100,
    heroMaxAttack:30,
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
        this.setState({ attacking: true })
        let attackDamage = this.state.heroAttack;
        this.attackTimer = setInterval(
          () => {
            if(this.state.monsterHealth <= 0){
              clearInterval(this.attackTimer);
              this.monsterKilled();
            }
            if (attackDamage > 0) {
              this.setState((prev) => ({
                monsterHealth: prev.monsterHealth - 1,
                heroAttack: prev.heroAttack - 1
              }));

            } else if (attackDamage > 0) {
              this.setState((prev) => ({
                monsterHealth: prev.monsterHealth - 1,
              }));
            }
            else {
              clearInterval(this.attackTimer);
              this.setState({ attacking: false });
            }
            attackDamage--;
          },
          10
        );
      }
    }
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
          if (this.state.heroAttack < 30 && this.state.heroStamina > 0) {
            this.setState((prev) => ({
              heroAttack: prev.heroAttack + 1,
              heroStamina: prev.heroStamina - 3
            }));
          }
        },
        300
      );
    }
  }
  _stopChargingAttack = () => {
    clearInterval(this.chargeAttackTimer);
  }
  render() {
    return (
      <div className="content-wrapper nes-content">
        <section className="nes-container is-rounded game-box with-title is-centered">
        <p class="title">Battle Boy</p>
          <div className="nes-container is-rounded screen-wrapper">
          <div className="game-screen is-rounded">
               
              {!this.state.started ? 
              <StartScreen />
                :
                <React.Fragment>
                <Monster health={this.state.monsterHealth}
                  maxHealth={this.state.monsterMaxHealth}
                  stamina={this.state.monsterStamina}
                  maxStamina={this.state.monsterMaxStamina}
                  className={this.state.monsterClassName}
                  name={this.state.monsterName} />
                  <HeroBars
                  health={this.state.heroHealth}
                  maxHealth={this.state.heroMaxHealth}
                  stamina={this.state.heroStamina}
                  maxStamina={this.state.heroMaxStamina}
                  attack={this.state.heroAttack}
                  maxAttack={this.state.heroMaxAttack} />
                  </React.Fragment>
              }
            </div>
            </div>

         <HeroButtons 
         attack={this._attack}
         chargeAttack={this._chargeAttack}
         stopChargingAttack={this._stopChargingAttack}
         heal={this._heal}
         stopeHealing={this._stopHealing}
         charge={this._charge}
         stopCharging={this._stopCharging}
         />
        </section>
      </div>
    )
  }
}

export default Nes