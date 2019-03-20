import React from 'react';
import '../../../content/css/nes-test.css';
import Monster from '../nes/monster.jsx';
import HeroBars from '../nes/hero-bars.jsx';
import HeroButtons from '../nes/hero-buttons.jsx';
import StartScreen from '../nes/start-screen.jsx';
import LevelUpScreen from '../nes/level-up-screen.jsx';
import GameOverScreen from './game-over.jsx';

class Nes extends React.Component {
  state = {
    started: true,
    monsterName: "Mario",
    monsterHealth: 0,
    monsterMaxHealth: 0,
    monsterAttack: 0,
    monsterMaxAttack: 0,
    monsterAttackPattern: [0],
    monsterStamina: 0,
    monsterMaxStamina: 0,
    monsterStaminaRecoveryRate: 0,
    monsterClassName: "",
    monsterAttacking: false,
    heroName: "Hero",
    heroMaxHealth: 40,
    heroHealth: 40,
    heroMaxStamina: 40,
    heroStamina: 30,
    heroMaxAttack: 10,
    heroAttack: 0,
    heroAttackChargeRate: 400,
    heroStaminaChargeRate: 400,
    heroHealRate: 400,
    heroLevel: 1,
    heroAttackLevel: 1,
    heroStaminaLevel: 1,
    heroHealthLevel: 1,
    levelUpHealth: 10,
    levelUpStamina: 10,
    levelUpAttack: 10,
    levelUp: true,
    levelUpHealthTree: [{ type: 'speed', value: 20 }, { type: 'points', value: 10 }, { type: 'speed', value: 20 }, { type: 'points', value: 20 }, { type: 'speed', value: 30 }, { type: 'points', value: 30 }, { type: 'speed', value: 40 }],
    levelUpAttackTree: [{ type: 'speed', value: 20 }, { type: 'points', value: 10 }, { type: 'speed', value: 20 }, { type: 'points', value: 20 }, { type: 'speed', value: 30 }, { type: 'points', value: 30 }, { type: 'speed', value: 40 }],
    levelUpStaminaTree: [{ type: 'speed', value: 20 }, { type: 'points', value: 10 }, { type: 'speed', value: 20 }, { type: 'points', value: 20 }, { type: 'speed', value: 30 }, { type: 'points', value: 30 }, { type: 'speed', value: 40 }],
    gameOver: false,
    attacking: false,
    monsters: [{ name: "Mario", health: 40, attack: 10, attackPattern: [10], staminaRecoveryRate: 900, className: "nes-mario" },
    { name: "Ash", health: 60, attack: 15, attackPattern: [15, 10], staminaRecoveryRate: 800, className: "nes-ash" },
    { name: "Poké Ball", health: 90, attack: 30, attackPattern: [5, 5, 5, 10, 30], staminaRecoveryRate: 700, className: "nes-pokeball" },
    { name: "Bulbasaur", health: 130, attack: 40, attackPattern: [40, 10, 20, 40], staminaRecoveryRate: 600, className: "nes-bulbasaur" },
    { name: "Charmander", health: 180, attack: 60, attackPattern: [20, 40, 20, 40], staminaRecoveryRate: 500, className: "nes-charmander" },
    { name: "Squirtle", health: 240, attack: 70, attackPattern: [10, 10, 10, 10, 5, 35, 70], staminaRecoveryRate: 400, className: "nes-squirtle" },
    { name: "Kirby", health: 300, attack: 90, ttackPattern: [90, 45, 10, 5, 10, 45, 90], staminaRecoveryRate: 300, className: "nes-kirby" }]
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
      monsterAttack: 0,
      monsterMaxAttack: nextMonster.attack,
      monsterAttackPattern: nextMonster.attackPattern,
      monsterStamina: 0,
      monsterMaxStamina: 100,
      monsterStaminaRecoveryRate: nextMonster.staminaRecoveryRate,
      monsterClassName: nextMonster.className
    }, this.activateMonster);
  }
  activateMonster = () => {
    let attackIndex = 0;
    this.monsterTimer = setInterval(() => {
      if (!this.state.monsterAttacking) {
        if (this.state.monsterAttack === this.state.monsterAttackPattern[attackIndex] && this.state.monsterHealth > 0) {
          attackIndex++;
          if (!this.state.monsterAttackPattern[attackIndex])
            attackIndex = 0
          this.monsterAttack();
        } else if (this.state.monsterAttack < this.state.monsterAttackPattern[attackIndex] && this.state.monsterHealth > 0) {
          this.setState((prev) => ({ monsterAttack: prev.monsterAttack + 1 }));
        } else if (this.state.monsterHealth <= 0) {
          clearInterval(this.monsterTimer);
        }
      }
    },
      this.state.monsterStaminaRecoveryRate);
  }
  monsterKilled = () => {
    //TODO show results maybe add level up type thing
    setTimeout(() => {
      this.setState({
        levelUp: true
      })
    }, 2000);
  }
  heroKilled = () => {
    clearInterval(this.monsterAttackTimer);
    clearInterval(this.heroAttack);
    this.setState({
      monsterAttacking: false,
      gameOver: true
    });
  }
  getReadyForNextRound = () => {
    //heal hero states
    this.setState((prev) => ({
      heroHealth: prev.heroMaxHealth,
      heroStamina: prev.heroMaxStamina,
      heroAttack: 0,
      levelUp: false
    }), this.loadMonster());

  }
  monsterAttack = () => {
    this.setState({ monsterAttacking: true });
    this.monsterAttackTimer = setInterval(
      () => {
        if (this.state.monsterAttack > 0 && this.state.heroHealth > 0) {
          this.setState((prev) => ({
            heroHealth: prev.heroHealth - 1,
            monsterAttack: prev.monsterAttack - 1,
          }));
        }
        else if (this.state.heroHealth < 1) {
          this.heroKilled();
        }
        else if (this.state.monsterAttack === 0) {
          this.setState({ monsterAttacking: false });
          clearInterval(this.monsterAttackTimer);
        }
      },
      10
    );
  }
  _startGame = () => {
    this.loadMonster();
  }
  _resetGame = () => {
    this.setState((prev) => ({
      heroHealth: prev.heroMaxHealth,
      heroStamina: prev.heroMaxStamina,
      heroAttack: prev.heroMaxAttack,
      heroLevel: 1,
      gameOver: false,
      monsterName: ""
    }), this.loadMonster);
  }
  _attack = () => {
    if (this.state.heroAttack > 0) {
      this.setState({ attacking: true })
      let attackDamage = this.state.heroAttack;
      this.attackTimer = setInterval(
        () => {
          if (this.state.monsterHealth < 1) {
            clearInterval(this.attackTimer);
            this.monsterKilled();
          }
          if (attackDamage > 0 && this.state.monsterHealth > 0) {
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
  _charge = () => {
    this.chargeTimer = setInterval(
      () => {
        if (this.state.heroStamina < this.state.heroMaxStamina) {
          this.setState((prev) => ({
            heroStamina: prev.heroStamina + 1
          }));
        }
      },
      this.state.heroStaminaChargeRate
    );
  }
  _stopCharging = () => {
    clearInterval(this.chargeTimer);
  }
  _heal = () => {
    this.healTimer = setInterval(
      () => {
        if (this.state.heroHealth < this.state.heroMaxHealth && this.state.heroStamina > 0) {
          this.setState((prev) => ({
            heroHealth: prev.heroHealth + 1,
            heroStamina: prev.heroStamina - 1
          }));
        } else {
          clearInterval(this.healTimer);
        }
      },
      this.state.heroHealRate
    );
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
          // if (this.state.heroAttack < 30 && this.state.heroStamina > 0) {
          //   this.setState((prev) => ({
          //     heroAttack: prev.heroAttack + 1,
          //     heroStamina: prev.heroStamina - 3 < 0 ? 0 : prev.heroStamina - 3
          //   }));
          // }
          if (this.state.heroAttack < this.state.heroMaxAttack && this.state.heroStamina > 0) {
            this.setState((prev) => ({
              heroAttack: prev.heroAttack + 1,
              heroStamina: prev.heroStamina - 1
            }));
          }
        },
        this.state.heroAttackChargeRate
      );
    }
  }
  _stopChargingAttack = () => {
    clearInterval(this.chargeAttackTimer);
  }
  _levelUpNone = () => {
    this.getReadyForNextRound();
  }
  _levelUpHealth = () => {
    if(this.state.levelUpHealthTree[this.state.heroLevel -1].type === "speed"){
      this.setState((prev) => ({heroHealRate:prev.heroHealRate - ((this.state.levelUpHealthTree[this.state.heroLevel -1].value / prev.heroHealRate) * 100),
      heroLevel:prev.heroLevel +1}),this.getReadyForNextRound)
    } else{
      this.setState((prev) => ({heroMaxHealth:prev.heroMaxHealth + this.state.levelUpHealthTree[this.state.heroLevel -1].value,
        heroLevel:prev.heroLevel +1, heroStaminaLevel:prev.heroStaminaLevel +1}),this.getReadyForNextRound)
    }
  }
  _levelUpAttack = () => {
    if(this.state.levelUpAttackTree[this.state.heroLevel -1].type === "speed"){
      this.setState((prev) => ({heroAttackChargeRate:prev.heroAttackChargeRate - ((this.state.levelUpAttackTree[this.state.heroLevel -1].value / prev.heroAttackChargeRate) * 100),
      heroLevel:prev.heroLevel +1, heroAttackLevel:prev.heroAttackLevel +1}),this.getReadyForNextRound)
    } else{
      this.setState((prev) => ({heroMaxAttack:prev.heroMaxAttack + this.state.levelUpAttackTree[this.state.heroLevel -1].value,
        heroLevel:prev.heroLevel +1, heroAttackLevel:prev.heroAttackLevel +1}),this.getReadyForNextRound)
    }
  }
  _levelUpStamina = () => {
    if(this.state.levelUpStaminaTree[this.state.heroLevel -1].type === "speed"){
      this.setState((prev) => ({heroStaminaChargeRate:prev.heroStaminaChargeRate - ((this.state.levelUpStaminaTree[this.state.heroLevel -1].value / prev.heroStaminaChargeRate) * 100),
      heroLevel:prev.heroLevel +1, heroStaminaLevel:prev.heroStaminaLevel +1}),this.getReadyForNextRound)
    } else{
      this.setState((prev) => ({heroMaxStamina:prev.heroMaxStamina + this.state.levelUpStaminaTree[this.state.heroLevel -1].value,
        heroLevel:prev.heroLevel +1, heroStaminaLevel:prev.heroStaminaLevel +1}),this.getReadyForNextRound)
    }
  }
  render() {
    let screenContent = "",
      heroButtons = "";
    if (this.state.gameOver) {
      screenContent = <GameOverScreen retry={this._resetGame} />;
      heroButtons = <HeroButtons
        attackButtonText="Retry"
        staminaButtonText="Retry"
        healButtonText="Retry"
        chargeAttackButtonText="Retry"
        attack={this._resetGame}
        chargeAttack={this._resetGame}
        stopChargingAttack={() => { }}
        heal={this._resetGame}
        stopHealing={() => { }}
        charge={this._resetGame}
        stopCharging={() => { }}
      />
    }
    else if (this.state.levelUp) {
      screenContent = <LevelUpScreen levelUpHealth={this._levelUpHealth}
        healthValue={this.state.levelUpHealthTree[this.state.heroHealthLevel - 1]}
        levelUpStamina={this._levelUpStamina}
        staminaValue={this.state.levelUpStaminaTree[this.state.heroStaminaLevel - 1]}
        levelUpAttack={this._levelUpAttack}
        attackValue={this.state.levelUpAttackTree[this.state.heroAttackLevel - 1]} />;
      heroButtons = <HeroButtons
        attackButtonText="Skip"
        staminaButtonText="Stamina"
        healButtonText="Health"
        chargeAttackButtonText="Attack"
        attack={this._levelUpNone}
        chargeAttack={this._levelUpAttack}
        stopChargingAttack={() => { }}
        heal={this._levelUpHealth}
        stopHealing={() => { }}
        charge={this._levelUpStamina}
        stopCharging={() => { }} />
    } else if (!this.state.started) {
      screenContent = <StartScreen />
      heroButtons = <HeroButtons
        attackButtonText="D"
        staminaButtonText="A"
        healButtonText="B"
        chargeAttackButtonText="C"
        attack={this._startGame}
        chargeAttack={this._startGame}
        stopChargingAttack={() => { }}
        heal={this._startGame}
        stopHealing={() => { }}
        charge={this._startGame}
        stopCharging={() => { }} />
    } else {
      screenContent = <React.Fragment>
        <Monster health={this.state.monsterHealth}
          maxHealth={this.state.monsterMaxHealth}
          attack={this.state.monsterAttack}
          maxAttack={this.state.monsterMaxAttack}
          className={this.state.monsterClassName}
          name={this.state.monsterName} />
        <HeroBars
          level={this.state.heroLevel}
          name={this.state.heroName}
          health={this.state.heroHealth}
          maxHealth={this.state.heroMaxHealth}
          stamina={this.state.heroStamina}
          maxStamina={this.state.heroMaxStamina}
          attack={this.state.heroAttack}
          maxAttack={this.state.heroMaxAttack} />
      </React.Fragment>;
      heroButtons = <HeroButtons
        attackButtonText="Attack"
        staminaButtonText="Charge SP"
        healButtonText="Heal"
        chargeAttackButtonText="Charge AP"
        attack={this._attack}
        chargeAttack={this._chargeAttack}
        stopChargingAttack={this._stopChargingAttack}
        heal={this._heal}
        stopHealing={this._stopHealing}
        charge={this._charge}
        stopCharging={this._stopCharging}
      />;
    }
    return (
      <div className="content-wrapper nes-content">
        <section className="nes-container is-rounded game-box with-title is-centered">
          <p class="title">Battle Boy</p>
          <div className="nes-container is-rounded screen-wrapper">
            <div className="game-screen is-rounded">
              {screenContent}
            </div>
          </div>
          {heroButtons}
        </section>
      </div>
    )
  }
}

export default Nes