import React from 'react';

import DragScroll from 'react-dragscroll';

import { DiamondSorter } from './diamond-sorter.jsx';
import { DiamondPallete } from './diamond-palette.jsx';

import '../content/css/shape-sorter.css';
import '../content/css/carousel.css';

class SimpleSorter extends React.Component {
    state = {
        animateDiamondClass: "",
        selectedPatterns: [],
        answerPatterns:["red","blue","green","black"],
        diamondSorterContent: [{ id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }, { id: null, value: 0 }],
        currentPhasePatterns: [],
        gamePhase: 0,
        challangePatterns1: [["red", 0, 0, 0], [0, "blue", 0, 0], [0, 0, "green", 0], [0, 0, 0, "black"]],
        challangePatterns2:[["red", 0, 0, 0],[0, 0, 0, "black"],[0, "green", "blue", 0],[0, "red", "blue", 0],[0, "black", "green", 0],[0, 0, "green", 0],[0, "blue", "green", 0],["blue",0,0,0]],
        challangePatterns3:[["red", 0, 0, "black"],[0, 0, "green", 0],[0, "green", 0, 0],[0, 0, "blue", 0],[0, "blue", 0, 0],[0, "green", "blue", 0],[0,0,0,"red",],["black",0,0,0],["black", 0, 0, "red"],[0, 0, 0, "black"]],
        challangePatterns4: [["red", "blue", 0, 0],[0, 0, "green", "black"],["blue", "red", 0, 0],[0, 0, "black", "green"],["green", "black", 0, 0],["green", 0, "black", 0],[0, "blue", 0, "black"],["red", 0, 0, 0],[0, 0, 0, "black"],[0, 0, "green", 0]],
        challangePatterns5:[["red",0,"green",0],[0,"blue",0,"black"],["red", "blue", 0, 0],[0, 0, "green", "black"],["blue", "red", 0, 0],["green", 0, 0, 0], [0, 0, 0, "blue"],[0, "blue", 0, 0], [0, 0, "green", 0]],
        

        challengePatternsRotate1:[[0, 0, "red", 0], ["green", 0, 0, "blue"],["black", 0, 0,0],[0, "blue", 0, 0],["blue", "black", 0, 0],["green", "blue", 0, 0],["black", "red", 0, 0]],
       
       
        singles: [["red", 0, 0, 0], [0, "blue", 0, 0], [0, 0, "green", 0], [0, 0, 0, "black"]],
        vertical: [["red", 0, 0, "black"], ["black", 0, 0, "red"], ["green", 0, 0, "blue"], ["blue", 0, 0, "green"]],
        horizontal: [[0, "blue", "green", 0], [0, "green", "blue", 0], [0, "red", "black", 0], [0, "black", "red", 0]],
        diagonals: [["red", "blue", 0, 0], ["red", 0, "blue", 0], [0, 0, "blue", "red"], [0, "red", 0, "blue"],
        ["blue", "black", 0, 0], ["black", 0, "blue", 0], [0, 0, "black", "blue"], [0, "blue", 0, "black"],
        ["green", "black", 0, 0], ["green", 0, "black", 0], [0, 0, "black", "green"], [0, "black", 0, "green"],
        ["red", "green", 0, 0], ["green", 0, "red", 0], [0, 0, "green", "red"], [0, "red", 0, "green"]],
        triangles: [["red", "green", "blue", 0], ["green", 0, "red", "blue"], [0, "blue", "green", "red"], ["blue", "red", "green", 0],
        [0, "green", "blue", "black"], ["green", "black", 0, "blue"], ["black", "blue", "green", 0], ["blue", 0, "black", "green"],
        ["red", "green", 0, "black"], ["green", "black", "red", 0], ["black", 0, "green", "red"], [0, "red", "black", "green"],
        ["red", 0, "blue", "black"], [0, "black", "red", "blue"], ["black", "blue", 0, "red"], ["blue", "red", "black", 0]],
        all:[["red", "green", "blue", 0], ["green", 0, "red", "blue"], [0, "blue", "green", "red"], ["blue", "red", "green", 0],
        [0, "green", "blue", "black"], ["green", "black", 0, "blue"], ["black", "blue", "green", 0], ["blue", 0, "black", "green"],
        ["red", "green", 0, "black"], ["green", "black", "red", 0], ["black", 0, "green", "red"], [0, "red", "black", "green"],
        ["red", 0, "blue", "black"], [0, "black", "red", "blue"], ["black", "blue", 0, "red"], ["blue", "red", "black", 0],
        ["red", "blue", 0, 0], ["red", 0, "blue", 0], [0, 0, "blue", "red"], [0, "red", 0, "blue"],
        ["blue", "black", 0, 0], ["black", 0, "blue", 0], [0, 0, "black", "blue"], [0, "blue", 0, "black"],
        ["green", "black", 0, 0], ["green", 0, "black", 0], [0, 0, "black", "green"], [0, "black", 0, "green"],
        ["red", "green", 0, 0], ["green", 0, "red", 0], [0, 0, "green", "red"], [0, "red", 0, "green"],
        ["red", "blue", 0, 0], ["red", 0, "blue", 0], [0, 0, "blue", "red"], [0, "red", 0, "blue"],
        ["blue", "black", 0, 0], ["black", 0, "blue", 0], [0, 0, "black", "blue"], [0, "blue", 0, "black"],
        ["green", "black", 0, 0], ["green", 0, "black", 0], [0, 0, "black", "green"], [0, "black", 0, "green"],
        ["red", "green", 0, 0], ["green", 0, "red", 0], [0, 0, "green", "red"], [0, "red", 0, "green"],
        ["red", 0, 0, 0], [0, "blue", 0, 0], [0, 0, "green", 0], [0, 0, 0, "black"],
        ["red", 0, 0, "black"], ["black", 0, 0, "red"], ["green", 0, 0, "blue"], ["blue", 0, 0, "green"],
        [0, "blue", "green", 0], [0, "green", "blue", 0], [0, "red", "black", 0], [0, "black", "red", 0]],
        
        
    }
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    componentWillMount = () => {
        // Perform the set up for the challenge here
        let currentPhasePatterns = this.shuffle(this.state.challengePatternsRotate1).map((pattern, index) => {
            return { id: index += "singles", pattern: pattern, selected: false }
        }
        );

        this.setState({ currentPhasePatterns }, console.log(this.state));

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

        //    3 check if game is won.diagonals

    }
    removePattern = (id) => {
        let selectedPatterns = this.state.selectedPatterns.slice(),
            selectedPattern = selectedPatterns.find((obj) => { return obj.id === id; });

        //   Remove and deselct
        // Should use set state here
        selectedPattern.selected = false;
        selectedPatterns.splice(selectedPatterns.indexOf(selectedPattern), 1);

        let diamondSorterContent = this.state.diamondSorterContent;
        this.setState({ selectedPatterns: selectedPatterns });


        //Remove the pattern from the shape
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


        // Check if the arrays postion elments === null
        for (let i = 0; i < pattern.pattern.length; i++) {
            debugger;
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
            }, console.log(this.state))
        }
    }
    rotateDown = () => {
        debugger;
      let diamondSorterContent =  this.state.diamondSorterContent,
      answerPatterns = this.state.answerPatterns,
      newDiamondSorterContent = [0,0,0,0],
      newAnswerPatterns =[0,0,0,0];
     
      newDiamondSorterContent[0] = diamondSorterContent[2];
      newDiamondSorterContent[1] = diamondSorterContent[0];
      newDiamondSorterContent[2] = diamondSorterContent[3];
      newDiamondSorterContent[3] = diamondSorterContent[1];

      newAnswerPatterns[0] = answerPatterns[2];
      newAnswerPatterns[1] = answerPatterns[0];
      newAnswerPatterns[2] = answerPatterns[3];
      newAnswerPatterns[3] = answerPatterns[1];

      this.setState({
           diamondSorterContent:newDiamondSorterContent,
           answerPatterns:newAnswerPatterns
      });
    }
    render() {
        let phase1 = this.state.currentPhasePatterns.map((pattern, index) =>
            <div key={pattern.id}>
                <DiamondPallete id={pattern.id}
                    onClick={this.patternClicked}
                    pattern={pattern.pattern}
                    selected={pattern.selected} />
            </div>);
        return (
            <div className="full-page-fex-col-wrapper">
                <div className="fade-wrapper">
                    <div className="fade-left"></div>
                    <DragScroll className="carousel" width={1500}>
                        {phase1}
                    </DragScroll>
                    <div className="fade-right"></div>
                </div>
                <div className="shape-sorter-wrapper">
                    <DiamondSorter
                        // onClick={this.patternClicked}
                        answerPatterns={this.state.answerPatterns}
                        onClick={this.rotateDown}
                        pattern={this.state.diamondSorterContent} />
                </div>
            </div>
        )
    }
}

export { SimpleSorter }