import React from 'react';
import '../../../content/nes-css/css/nes.css';
import '../../../content/css/nes-custom.css';
import NextCharacterScreen from '../nes/next-challeger-screen.jsx';
import Monster from '../nes/monster.jsx';
import HeroBars from '../nes/hero-bars.jsx';
import HeroButtons from '../nes/hero-buttons.jsx';
import StartScreen from '../nes/start-screen.jsx';
import LevelUpScreen from '../nes/level-up-screen.jsx';
import GameOverScreen from './game-over.jsx';
import GameWinScreen from './game-win.jsx';

class Nes extends React.Component {
  state = {
    started: false,
    currentView: "startScreen",
    showNextChallenger: true,
    tutorialMode: false,
    tutorialModeAText: "",
    tutorialModeBText: "",
    tutorialModeCText: "",
    tutorialModeDText: "",
    score: 0,
    monsterName: "",
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
    monsterSpecial: "",
    heroName: "Hero",
    heroMaxHealth: 50,
    heroHealth: 50,
    heroMaxStamina: 30,
    heroStamina: 30,
    heroMaxAttack: 10,
    heroAttack: 0,
    heroAttackChargeRate: 300,
    heroStaminaChargeRate: 300,
    heroHealRate: 300,
    heroLevel: 1,
    heroAttackLevel: 1,
    heroStaminaLevel: 1,
    heroHealthLevel: 1,
    levelUpHealth: 10,
    levelUpStamina: 10,
    levelUpAttack: 10,
    levelUp: false,
    levelUpHealthTree: [{ type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }],
    levelUpAttackTree: [{ type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }],
    levelUpStaminaTree: [{ type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }, { type: 'points', value: 10 }, { type: 'speed', value: 10 }],
    gameOver: false,
    gameWin: false,
    attacking: false,
    monsters: [
      { name: "Mario", health: 70, attack: 10, attackPattern: [10], staminaRecoveryRate: 700, className: "nes-mario", special: "" },
      // { name: "Mario", health: 1, attack: 10, attackPattern: [10], staminaRecoveryRate: 900, className: "nes-mario" },
      { name: "Ash", health: 90, attack: 15, attackPattern: [15, 10], staminaRecoveryRate: 700, className: "nes-ash", special: "attackOnFull" },
      // { name: "Ash", health: 1, attack: 15, attackPattern: [15, 10], staminaRecoveryRate: 800, className: "nes-ash" },
      { name: "Poké Ball", health: 110, attack: 25, attackPattern: [5, 5, 5, 10, 25], staminaRecoveryRate: 650, className: "nes-pokeball", special: "fastOnLowHealth" },
      // { name: "Poké Ball", health: 1, attack: 30, attackPattern: [5, 5, 5, 10, 30], staminaRecoveryRate: 700, className: "nes-pokeball" },
      { name: "Bulbasaur", health: 120, attack: 30, attackPattern: [30, 10, 20, 30], staminaRecoveryRate: 650, className: "nes-bulbasaur", special: "healOnOdd" },
      // { name: "Bulbasaur", health: 1, attack: 40, attackPattern: [40, 10, 20, 40], staminaRecoveryRate: 600, className: "nes-bulbasaur" },
      { name: "Charmander", health: 140, attack: 40, attackPattern: [10, 20, 30, 40, 5], staminaRecoveryRate: 625, className: "nes-charmander", special: "doubleDamageIfHealing" },
      // { name: "Charmander", health: 1, attack: 60, attackPattern: [10, 40, 20, 40, 60], staminaRecoveryRate: 500, className: "nes-charmander" },
      { name: "Squirtle", health: 240, attack: 80, attackPattern: [15, 10, 40, 15, 10, 80], staminaRecoveryRate: 350, className: "nes-squirtle" },
      // { name: "Squirtle", health: 240, attack: 80, attackPattern: [15, 10, 40, 15, 10, 80], staminaRecoveryRate: 350, className: "nes-squirtle" },
      { name: "Kirby", health: 300, attack: 90, attackPattern: [90, 45, 10, 5, 10, 45, 90], staminaRecoveryRate: 200, className: "nes-kirby" }],
    attackChargeClass: "",
    staminaChargeClass: "",
    monsterStatusClass: "",
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.stopTimers();
  }
  stopTimers = () => {
    clearInterval(this.scoreTimer);
    clearInterval(this.monsterTimer);
    clearInterval(this.monsterAttackTimer);
    clearInterval(this.tutorialModeTimer);
    clearInterval(this.attackTimer);
    clearInterval(this.chargeTimer);
    clearInterval(this.chargeAttackTimer);
    clearInterval(this.healTimer);
  }
  startScoreTimer = () => {
    this.scoreTimer = setInterval(
      () => {
        this.setState((prev) => ({ score: prev.score + 1 }));
      },
      1000
    );
  }
  stopScoreTimer = () => {
    clearInterval(this.scoreTimer);
  }
  loadMonster = () => {
    let nextMonster;

    if (this.state.monsterName != "") {
      const index = this.state.monsters.findIndex(item => item.name === this.state.monsterName);
      nextMonster = this.state.monsters[index + 1];
    } else {
      nextMonster = this.state.monsters[0];
    }
    if (nextMonster === undefined) {
      this.setState({ gameWin: true, currentView: "gameWinScreen" });
      return;
    }
    this.setState({
      currentView: "nextChallengerScreen",
      monsterName: nextMonster.name,
      monsterHealth: nextMonster.health,
      monsterMaxHealth: nextMonster.health,
      monsterAttack: 0,
      monsterMaxAttack: nextMonster.attack,
      monsterAttackPattern: nextMonster.attackPattern,
      monsterStamina: 0,
      monsterMaxStamina: 100,
      monsterStaminaRecoveryRate: nextMonster.staminaRecoveryRate,
      monsterClassName: nextMonster.className,
      monsterSpecial: nextMonster.special
    });
  }
  activateMonster = () => {
    this.setState({
      currentView: "battleScreen",
    }, () => {
      this.startScoreTimer();
      let attackIndex = 0;
      this.monsterTimer = setInterval(() => {
        if (!this.state.monsterAttacking) {
          if (this.state.monsterAttack >= (this.state.monsterAttackPattern[attackIndex] - 1) && this.state.monsterHealth > 0) {
            this.attacking("monsterStatusClass");
          }
          if (this.state.monsterAttack >= this.state.monsterAttackPattern[attackIndex] && this.state.monsterHealth > 0) {
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
    });

  }
  getReadyForNextRound = () => {
    //heal hero states
    this.setState((prev) => ({
      heroHealth: prev.heroMaxHealth,
      heroStamina: prev.heroMaxStamina,
      heroMaxAttack: prev.heroMaxAttack,
      heroAttack: 0,
      levelUp: false,
    }), this.loadMonster());

  }
  monsterKilled = () => {
    this.stopTimers();
    if (this.state.tutorialMode) {
      setTimeout(() => {
        this.setState({ tutorialMode: false, currentView: "startScreen" });
        this._resetGame();
      }, 2000);
      return;
    }

    this.stopScoreTimer();
    // let heroHealRatePercentageUp = Math.round(((10 / 100) * this.state.heroHealRate)),
    //   heroAttackChargeRatePercentageUp = Math.round(((10 / 100) * this.state.heroAttackChargeRate)),
    //   heroStaminaChargeRatePercentageUp = Math.round(((10 / 100) * this.state.heroStaminaChargeRate)),
    //   heroMaxHealthPercentageUp = Math.round(((10 / 100) * this.state.heroMaxHealth)),
    //   heroMaxAttackPercentageUp = Math.round(((20 / 100) * this.state.heroMaxAttack)),
    //   heroMaxStaminaPercentageUp = Math.round(((15 / 100) * this.state.heroMaxStamina));
    setTimeout(() => {
      this.setState((prev) => ({
        // heroHealRate: prev.heroHealRate - heroHealRatePercentageUp,
        // heroAttackChargeRate: prev.heroAttackChargeRate - heroAttackChargeRatePercentageUp,
        // heroStaminaChargeRate: prev.heroStaminaChargeRate - heroStaminaChargeRatePercentageUp,
        // heroMaxHealth: prev.heroMaxHealth + heroMaxHealthPercentageUp,
        // heroMaxAttack: prev.heroMaxAttack + heroMaxAttackPercentageUp,
        // heroMaxStamina: prev.heroMaxStamina + heroMaxStaminaPercentageUp,
        levelUp: true,
        currentView: "levelUpScreen"
      }))
    }, 2000);
  }
  heroKilled = () => {
    this.stopTimers();
    this.stopScoreTimer();
    setTimeout(() => {
      this.setState({
        monsterAttacking: false,
        gameOver: true,
        currentView: "gameOverScreen"
      });
    }, 1000)

  }
  monsterAttack = () => {
    this.setState({ monsterAttacking: true });

    if (this.state.monsterSpecial) {
      switch (this.state.monsterSpecial) {
        case "fastOnLowHealth":
          if (this.state.monsterHealth < 20)
            this.setState((prev) => ({ monsterStaminaRecoveryRate: 350 }));
          break;
        case "doubleDamageIfHealing":
          if (this.healTimer);
          this.setState((prev) => ({ monsterAttack: prev.monsterHealth *2 }));
          break;
        default:
      }
    }

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
  alert = (propName) => {
    this.setState({ [propName]: "alert" });
    setTimeout(() => {
      this.setState({ [propName]: "" });
    }, 1000)
  }
  attacked = (propName) => {
    this.setState({ [propName]: " attacked" });
    setTimeout(() => {
      this.setState({ [propName]: "" });
    }, 1000)
  }
  attacking = (propName) => {
    this.setState({ [propName]: " attacking" });
    setTimeout(() => {
      this.setState({ [propName]: "" });
    }, 1000)
  }
  loadTutorial = () => {
    this.setState({
      monsterName: "Poké Ball",
      monsterHealth: 10,
      monsterMaxHealth: 10,
      monsterAttack: 4,
      monsterMaxAttack: 4,
      monsterAttackPattern: [5],
      monsterStamina: 0,
      monsterMaxStamina: 5,
      monsterStaminaRecoveryRate: 2000,
      monsterClassName: "nes-pokeball",
      heroHealth: 1,
      heroMaxHealth: 5,
      heroStamina: 0,
      heroMaxStamina: 5,
      heroMaxAttack: 5,
      heroAttack: 0,
      tutorialMode: true,
      tutorialModeBText: "Hold",
    });
    this.tutorialModeTimer = setInterval(() => {
      let monsterAttacked = false;
      if (this.state.heroStamina === 5 && this.state.tutorialModeBText === "Hold" && this.state.heroHealth === 1) {
        this.setState({ tutorialModeAText: "Hold", tutorialModeBText: "" });
      }
      if (this.state.heroStamina === 1 && this.state.tutorialModeAText === "Hold" && this.state.heroHealth === 5) {
        this.setState({ tutorialModeBText: "Hold", tutorialModeAText: "" });
      }
      if (this.state.heroStamina === 5 && this.state.tutorialModeBText === "Hold" && this.state.heroHealth === 5) {
        this.setState({ tutorialModeBText: "", tutorialModeCText: "Hold" });
      }
      if (this.state.heroStamina === 0 && this.state.tutorialModeCText === "Hold" && this.state.heroHealth === 5 && this.state.heroAttack === 5) {
        this.setState({ tutorialModeCText: "", tutorialModeDText: "Tap" });
      }

      if (this.state.heroStamina === 0 && this.state.tutorialModeDText === "Tap" && this.state.heroHealth === 5 && this.state.heroAttack === 0) {
        if (!monsterAttacked) {
          monsterAttacked = true;
          this.monsterAttack();
          this.setState({ monsterAttacking: false, tutorialModeDText: "", tutorialModeBText: "Hold" });
        }
      }


    }, 10);

  }
  _startGame = () => {
    this.loadMonster();
  }
  _startTutorial = () => {
    this.loadTutorial();
  }
  _resetGame = () => {
    this.setState((prev) => ({
      score: 0,
      heroHealth: 50,
      heroStamina: 30,
      heroAttack: 0,
      heroMaxAttack: 10,
      heroMaxStamina: 30,
      heroMaxHealth: 50,
      heroAttackChargeRate: 300,
      heroStaminaChargeRate: 300,
      heroHealRate: 300,
      heroLevel: 1,
      gameOver: false,
      gameWin: false,
      monsterName: ""
    }), this.loadMonster);
  }
  _attack = () => {
    if (this.state.heroAttack > 0) {
      this.setState({ attacking: true })
      if (this.state.monsterSpecial) {
        switch (this.state.monsterSpecial) {
          case "attackOnFull":
            if (this.state.heroAttack === this.state.heroMaxAttack)
              this.setState((prev) => ({ monsterAttack: prev.monsterMaxAttack }));
            break;
          case "healOnOdd":
            if (this.state.heroAttack % 2 != 0);
            this.setState((prev) => ({ monsterHealth: prev.monsterHealth + (Math.round(((10 / 100) * prev.heroAttack / 2))) }));
            break;
          default:
        }
      }

      let attackDamage = this.state.heroAttack;
      this.attackTimer = setInterval(
        () => {
          this.attacked('monsterStatusClass');
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
    } else {
      this.alert("attackChargeClass");
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
        } else if (this.state.heroStamina < 1) {
          this.alert("staminaChargeClass");
          clearInterval(this.healTimer);
        }
        else {
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
    this.chargeAttackTimer = setInterval(
      () => {
        if (this.state.heroAttack < this.state.heroMaxAttack && this.state.heroStamina > 0) {
          this.setState((prev) => ({
            heroAttack: prev.heroAttack + 1,
            heroStamina: prev.heroStamina - 1
          }));
        } else if (this.state.heroStamina < 1) {
          this.alert("staminaChargeClass");
          clearInterval(this.chargeAttackTimer);
        }
      },
      this.state.heroAttackChargeRate
    );
  }
  _stopChargingAttack = () => {
    clearInterval(this.chargeAttackTimer);
  }
  _levelUpNone = () => {
    this.getReadyForNextRound();
  }
  _levelUpHealth = () => {
    setTimeout(() => {
      if (this.state.levelUpHealthTree[this.state.heroLevel - 1].type === "speed") {
        this.setState((prev) => ({
          heroHealRate: prev.heroHealRate - Math.round(((this.state.levelUpHealthTree[this.state.heroLevel - 1].value / 100) * prev.heroHealRate)),
          heroLevel: prev.heroLevel + 1
        }), this.getReadyForNextRound)
      } else {
        this.setState((prev) => ({
          heroMaxHealth: prev.heroMaxHealth + Math.round(((this.state.levelUpHealthTree[this.state.heroLevel - 1].value / 100) * prev.heroMaxHealth)),
          heroLevel: prev.heroLevel + 1, heroStaminaLevel: prev.heroStaminaLevel + 1
        }), this.getReadyForNextRound)
      }
    }, 500)

  }
  _levelUpAttack = () => {
    if (this.state.levelUpAttackTree[this.state.heroLevel - 1].type === "speed") {
      this.setState((prev) => ({
        heroAttackChargeRate: prev.heroAttackChargeRate - Math.round(((this.state.levelUpAttackTree[this.state.heroLevel - 1].value / 100) * prev.heroAttackChargeRate)),
        heroLevel: prev.heroLevel + 1, heroAttackLevel: prev.heroAttackLevel + 1
      }), this.getReadyForNextRound)
    } else {
      this.setState((prev) => ({
        heroMaxAttack: prev.heroMaxAttack + Math.round(((this.state.levelUpAttackTree[this.state.heroLevel - 1].value / 100) * prev.heroMaxAttack)),
        heroLevel: prev.heroLevel + 1, heroAttackLevel: prev.heroAttackLevel + 1
      }), this.getReadyForNextRound)
    }
  }
  _levelUpStamina = () => {
    if (this.state.levelUpStaminaTree[this.state.heroLevel - 1].type === "speed") {
      this.setState((prev) => ({
        heroStaminaChargeRate: prev.heroStaminaChargeRate - Math.round(((this.state.levelUpStaminaTree[this.state.heroLevel - 1].value / 100) * prev.heroStaminaChargeRate)),
        heroLevel: prev.heroLevel + 1, heroStaminaLevel: prev.heroStaminaLevel + 1
      }), this.getReadyForNextRound)
    } else {
      this.setState((prev) => ({
        heroMaxStamina: prev.heroMaxStamina + Math.round(((this.state.levelUpStaminaTree[this.state.heroLevel - 1].value / 100) * prev.heroMaxStamina)),
        heroLevel: prev.heroLevel + 1, heroStaminaLevel: prev.heroStaminaLevel + 1
      }), this.getReadyForNextRound)
    }
  }
  render() {
    let screenContent = "",
      heroButtons = "";
    switch (this.state.currentView) {
      case "startScreen":
        screenContent = <StartScreen />
        heroButtons = <HeroButtons
          attackButtonText="Start"
          staminaButtonText="Start"
          healButtonText="Tutorial"
          chargeAttackButtonText="Start"
          clickOnly={true}
          attack={this._startGame}
          chargeAttack={this._startGame}
          heal={this._startTutorial}
          charge={this._startGame}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass} />
        break;
      case "battleScreen":
        screenContent = <React.Fragment>
          <Monster health={this.state.monsterHealth}
            maxHealth={this.state.monsterMaxHealth}
            attack={this.state.monsterAttack}
            maxAttack={this.state.monsterMaxAttack}
            className={this.state.monsterClassName}
            name={this.state.monsterName}
            monsterStatusClass={this.state.monsterStatusClass} />
          <HeroBars
            level={this.state.heroLevel}
            name={this.state.heroName}
            health={this.state.heroHealth}
            maxHealth={this.state.heroMaxHealth}
            stamina={this.state.heroStamina}
            maxStamina={this.state.heroMaxStamina}
            attack={this.state.heroAttack}
            maxAttack={this.state.heroMaxAttack}
            attackChargeClass={this.state.attackChargeClass}
            staminaChargeClass={this.state.staminaChargeClass}
          />
        </React.Fragment>;
        heroButtons = <HeroButtons
          attackButtonText="Tap to Attack"
          staminaButtonText="Hold to Charge Stamina"
          healButtonText="Hold to Heal"
          chargeAttackButtonText="Hold to Charge Attack"
          attack={this._attack}
          chargeAttack={this._chargeAttack}
          stopChargingAttack={this._stopChargingAttack}
          heal={this._heal}
          stopHealing={this._stopHealing}
          charge={this._charge}
          stopCharging={this._stopCharging}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass}
        />;
        break;
      case "levelUpScreen":
        screenContent = <LevelUpScreen levelUpHealth={this._levelUpHealth}
          healthValue={this.state.levelUpHealthTree[this.state.heroLevel - 1]}
          levelUpStamina={this._levelUpStamina}
          staminaValue={this.state.levelUpStaminaTree[this.state.heroLevel - 1]}
          levelUpAttack={this._levelUpAttack}
          attackValue={this.state.levelUpAttackTree[this.state.heroLevel - 1]} />;
          heroButtons = <HeroButtons
          clickOnly={true}
          attackButtonText="Skip"
          staminaButtonText="Stamina"
          healButtonText="Health"
          chargeAttackButtonText="Attack"
          attack={this._levelUpNone}
          chargeAttack={this._levelUpAttack}
          heal={this._levelUpHealth}
          charge={this._levelUpStamina}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass}
        />
        break
      case "tutorialScreen":
        screenContent = <React.Fragment>
          <Monster health={this.state.monsterHealth}
            maxHealth={this.state.monsterMaxHealth}
            attack={this.state.monsterAttack}
            maxAttack={this.state.monsterMaxAttack}
            className={this.state.monsterClassName}
            monsterStatusClass={this.state.monsterStatusClass}
            name={this.state.monsterName} />
          <HeroBars
            level={this.state.heroLevel}
            name={this.state.heroName}
            health={this.state.heroHealth}
            maxHealth={this.state.heroMaxHealth}
            stamina={this.state.heroStamina}
            maxStamina={this.state.heroMaxStamina}
            attack={this.state.heroAttack}
            maxAttack={this.state.heroMaxAttack}
            attackChargeClass={this.state.attackChargeClass}
            staminaChargeClass={this.state.staminaChargeClass}

          />
        </React.Fragment>;
        heroButtons = <HeroButtons
          attackButtonText={this.state.tutorialModeDText}
          staminaButtonText={this.state.tutorialModeBText}
          healButtonText={this.state.tutorialModeAText}
          chargeAttackButtonText={this.state.tutorialModeCText}
          attack={this._attack}
          chargeAttack={this._chargeAttack}
          stopChargingAttack={this._stopChargingAttack}
          heal={this._heal}
          stopHealing={this._stopHealing}
          charge={this._charge}
          stopCharging={this._stopCharging}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass}
        />;
        break
      case "gameOverScreen":
        screenContent = <GameOverScreen retry={this._resetGame} monsterName={this.state.monsterName} score={this.state.score} />;
        heroButtons = <HeroButtons
          clickOnly={true}
          attackButtonText="Retry"
          staminaButtonText="Retry"
          healButtonText="Retry"
          chargeAttackButtonText="Retry"
          attack={this._resetGame}
          chargeAttack={this._resetGame}
          heal={this._resetGame}
          charge={this._resetGame}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass}
        />
        break
      case "gameWinScreen":
        screenContent = <GameWinScreen retry={this._resetGame} monsterName={this.state.monsterName} score={this.state.score} />;
        heroButtons = <HeroButtons
          attackButtonText="Retry"
          staminaButtonText="Retry"
          healButtonText="Retry"
          chargeAttackButtonText="Retry"
          clickOnly={true}
          attack={this._resetGame}
          chargeAttack={this._resetGame}
          heal={this._resetGame}
          charge={this._resetGame}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass}
        />
        break
      case "nextChallengerScreen":
        screenContent = <NextCharacterScreen className={this.state.monsterClassName} name={this.state.monsterName} />
        heroButtons = <HeroButtons
          attackButtonText="Fight"
          staminaButtonText="Fight"
          healButtonText="Fight"
          chargeAttackButtonText="Fight"
          clickOnly={true}
          attack={this.activateMonster}
          chargeAttack={this.activateMonster}
          heal={this.activateMonster}
          charge={this.activateMonster}
          attackChargeClass={this.state.attackChargeClass}
          staminaChargeClass={this.state.staminaChargeClass} />
        break;
      default:
    }

    return (
      <div className="content-wrapper nes-content page">
        <section className="nes-container game-box with-title is-centered">
          <h3>Battle Boy</h3>
          <div className="nes-container screen-wrapper">
            <div className="game-screen">
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