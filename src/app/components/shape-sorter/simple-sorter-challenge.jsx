import React from 'react';
const Link = require('react-router-dom').Link;

import shuffle from '../../helpers/shuffle.js'
import patterns from '../../helpers/patterns.js'

import Diamond from '../diamond/diamond.jsx'
import Carousel from '../carousel/carousel.jsx'
import RotateButton from '../rotate-button/rotate-button.jsx'

import '../../../content/css/diamond-sorter.css';
import '../../../content/css/diamond-palette.css';
import '../../../content/css/diamond-animation.css';

class SimpleSorter extends React.Component {
    state = {
        animateDiamondClass: "",
        animateDiamondId: "",
        selectedPatterns: [],
        answerPatterns: ["red", "blue", "green", "black"],
        diamondSorterContent: [{ id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }],
        currentPhasePatterns: [],
        normalPatterns: [],
        rotatePatterns: [],
        gamePhase: 0,
        isRotatePhase: true,
    }
    resetGame = () => {
        let gamePhase = this.state.gamePhase;

        this.setState((prev) => ({
            selectedPattern: [],
            diamondSorterContent: [{ id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }]
        }));

        if (gamePhase === 0) {
            gamePhase++;
            let normalPatterns = shuffle(patterns.normalPatterns),
                rotatePatterns = shuffle(patterns.rotatePatterns),
                currentPhase = this.phaseSetup(patterns.challangePatterns1);

            this.setState((prev) => ({
                currentPhasePatterns: currentPhase,
                normalPatterns: normalPatterns,
                rotatePatterns: rotatePatterns,
                gamePhase: gamePhase,
                selectedPattern: [],
                diamondSorterContent: [{ id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }]
            }));
        } else if (gamePhase < 4) {
            let currentPhase = this.phaseSetup(this.state.normalPatterns[gamePhase]);
            gamePhase++;
            this.setState((prev) => ({
                gamePhase: gamePhase,
                currentPhasePatterns: currentPhase
            }));
        } else {
            let currentPhase = this.phaseSetup(this.state.rotatePatterns[gamePhase - 4]);
            gamePhase++;
            this.setState((prev) => ({
                gamePhase: gamePhase,
                currentPhasePatterns: currentPhase,
                isRotatePhase: true
            }));
        }
    }
    checkWin = () => {
        let diamondSorterContent = this.state.diamondSorterContent,
            answerPatterns = this.state.answerPatterns,
            gamePhase = this.state.gamePhase;

        if (diamondSorterContent[0].value === answerPatterns[0] &&
            diamondSorterContent[1].value === answerPatterns[1] &&
            diamondSorterContent[2].value === answerPatterns[2] &&
            diamondSorterContent[3].value === answerPatterns[3]
        ) {
            this.setState((prev) => ({
                animateDiamondClass: prev.animateDiamondClass === "" || prev.animateDiamondClass === "success" || prev.animateDiamondClass === "success-toggle" ? "success-toggle" : "success"
            }));

            if (gamePhase === 6) {
                this.gameWin();
            } else {
                this.resetGame()
            }
        }
    }
    gameWin = () => {
        console.log("complete");
    }
    phaseSetup = (pattern) => {
        return shuffle(pattern).map((pattern, index) => {
            return { id: index, pattern: pattern, selected: false }
        }
        );
    }
    componentWillMount = () => {
        this.resetGame();
    }
    redClicked = () => {
        this.setState({
            animateDiamondClass: "insert-diamond"
        })
    }
    patternClicked = (id) => {
        let selectedPattern = this.state.selectedPatterns.find((obj) => { return obj.id === id; });

        if (selectedPattern) {
            this.removePattern(id);

        } else {
            this.addPattern(id);
        }
    }

    removePattern = (id) => {
        let selectedPatterns = this.state.selectedPatterns.slice(),
            selectedPattern = selectedPatterns.find((obj) => { return obj.id === id; });

        selectedPattern.selected = false;
        selectedPatterns.splice(selectedPatterns.indexOf(selectedPattern), 1);

        let diamondSorterContent = this.state.diamondSorterContent;
        this.setState({ selectedPatterns: selectedPatterns });

        for (let i = 0; i < diamondSorterContent.length; i++) {
            if (diamondSorterContent[i].id === id) {
                diamondSorterContent[i].value = 0;
                diamondSorterContent[i].id = null;
            } else {
                continue;
            }
        }
        this.setState({ diamondSorterContent: diamondSorterContent, diamondSorterContent: diamondSorterContent });
    }
    addPattern = (id) => {
        let pattern = this.state.currentPhasePatterns.find(function (obj) { return obj.id === id; });
        let selectedPatterns = this.state.selectedPatterns.slice();
        let diamondSorterContent = this.state.diamondSorterContent;
        let failed = false;

        for (let i = 0; i < pattern.pattern.length; i++) {
            if (pattern.pattern[i] != 0 && diamondSorterContent[i].value === 0 && pattern.pattern[i] === this.state.answerPatterns[i]) {
                diamondSorterContent[i].value = pattern.pattern[i];
                diamondSorterContent[i].id = pattern.id;
            } else if ((diamondSorterContent[i].value != 0 && pattern.pattern[i] != 0) || (pattern.pattern[i] != 0 && pattern.pattern[i] != this.state.answerPatterns[i])) {
                failed = true;
                break;
            }
            else {
                continue;
            }
        }

        if (!failed) {
            pattern.selected = true;
            selectedPatterns.push(pattern);
            this.setState({
                diamondSorterContent: diamondSorterContent,
                selectedPatterns: selectedPatterns
            }, this.checkWin)
        }
    }
    rotateDown = () => {
        if (this.state.isRotatePhase && !this.state.locked) {

            this.setState((prev) => ({
                animateDiamondId: prev.animateDiamondId === "" || prev.animateDiamondId === "rotate" ? "rotate-toggle" : "rotate",
                locked: true
            }));
            setTimeout(() => {
                let diamondSorterContent = this.state.diamondSorterContent,
                    answerPatterns = this.state.answerPatterns,
                    newDiamondSorterContent = [0, 0, 0, 0],
                    newAnswerPatterns = [0, 0, 0, 0];

                newDiamondSorterContent[0] = diamondSorterContent[2];
                newDiamondSorterContent[1] = diamondSorterContent[0];
                newDiamondSorterContent[2] = diamondSorterContent[3];
                newDiamondSorterContent[3] = diamondSorterContent[1];

                newAnswerPatterns[0] = answerPatterns[2];
                newAnswerPatterns[1] = answerPatterns[0];
                newAnswerPatterns[2] = answerPatterns[3];
                newAnswerPatterns[3] = answerPatterns[1];

                this.setState({
                    diamondSorterContent: newDiamondSorterContent,
                    answerPatterns: newAnswerPatterns,
                    locked:false
                });
            }, 1999);
        }
    }
    render() {
        let diamondSorterContent = this.state.diamondSorterContent,
            answerPatterns = this.state.answerPatterns,

            patterns = this.state.currentPhasePatterns.map((pattern, index) =>
                <div key={pattern.id}>
                    <Diamond
                        wrapperId={pattern.id}
                        wrapperClass={pattern.selected ? 'selected diamond-holder-pallete' : '' + 'diamond-holder-pallete'}
                        mainDiamondClicked={() => { this.patternClicked(pattern.id) }}
                        topDiamondClass={pattern.pattern[0]}
                        rightDiamondClass={pattern.pattern[1]}
                        leftDiamondClass={pattern.pattern[2]}
                        bottomDiamondClass={pattern.pattern[3]}
                    />
                </div>
            );
        return (
            <div>
                <Carousel items={patterns} />
                <div className="center-wrapper-horizontal padding-gapper-2">
                    <div className="relative-wrapper">
                        <Diamond
                            wrapperId={this.state.animateDiamondId}
                            wrapperClass={this.state.animateDiamondClass + ' diamond-sorter'}
                            mainDiamondClicked={this.rotateDown}
                            topDiamondClass={diamondSorterContent[0].value != 0 ? "diamond-" + diamondSorterContent[0].value : answerPatterns[0]}
                            rightDiamondClass={diamondSorterContent[1].value != 0 ? "diamond-" + diamondSorterContent[1].value : answerPatterns[1]}
                            leftDiamondClass={diamondSorterContent[2].value != 0 ? "diamond-" + diamondSorterContent[2].value : answerPatterns[2]}
                            bottomDiamondClass={diamondSorterContent[3].value != 0 ? "diamond-" + diamondSorterContent[3].value : answerPatterns[3]}
                            animateDiamondClass={this.state.animateDiamondClass} >
                            <RotateButton rotate={this.rotateDown} />
                        </Diamond>
                    </div>
                    <Link className="next" to="/micro-garden">
                        <h1>NEXT</h1>
                    </Link>
                </div>
            </div>
        )
    }
}

export default SimpleSorter 