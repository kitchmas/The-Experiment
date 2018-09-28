import React from 'react';

import DragScroll from 'react-dragscroll';

import { DiamondSorter } from './diamond-sorter.jsx';
import { DiamondPallete } from './diamond-palette.jsx';

import '../content/css/shape-sorter.css';
import '../content/css/carousel.css';

class SimpleSorter extends React.Component {
    state = {
        animateDiamondClass: "",
        selectedPatterns:[],
        sorterFilledPatterns:[0,0,0,0],
        challangePatternsPhase1:[],
        singles:[["red",0,0,0],[0,"green",0,0],[0,0,"blue",0],[0,0,0,"black"]],
        vertical:[["red",0,0,"black"],["black",0,0,"red"],["green",0,0,"blue"],["blue",0,0,"green"]],
        horizontal:[[0,"blue","green",0],[0,"green","blue",0],[0,"red","black",0],[0,"black","red",0]],
        diagonals:[["red","blue",0,0],["red",0,"blue",0],[0,0,"blue","red"],[0,"red",0,"blue"],
        ["blue","black",0,0],["black",0,"blue",0],[0,0,"black","blue"],[0,"blue",0,"black"],
        ["green","black",0,0],["green",0,"black",0],[0,0,"black","green"],[0,"black",0,"green"],
        ["red","green",0,0],["green",0,"red",0],[0,0,"green","red"],[0,"red",0,"green"]],
        triangles:[["red","green","blue",0],["green",0,"red","blue"],[0,"blue","green","red"],["blue","red","green",0],
        [0,"green","blue","black"],["green","black",0,"blue"],["black","blue","green",0],["blue",0,"black","green"],
        ["red","green",0,"black"],["green","black","red",0],["black",0,"green","red"],[0,"red","black","green"],
        ["red",0,"blue","black"],[0,"black","red","blue"],["black","blue",0,"red"],["blue","red","black",0]]
    }
    componentWillMount = () =>{
        // Perform the set up for the challenge here

        let challangePatternsPhase1 = this.state.singles.map((pattern,index) =>{
          return {id: index += "singles",pattern:pattern}
        }
        );

        this.setState({challangePatternsPhase1});


    }
    redClicked = () => {
        this.setState({
            animateDiamondClass: "insert-diamond"
        })
    }
    patternClicked = (id) =>{
        debugger;
      let selectedPattern = this.state.selectedPatterns.find(function (obj) { return obj.id === id; });
       
      if(selectedPattern){
        //   Remove and deselct
      } else{
        let pattern = this.state.challangePatternsPhase1.find(function (obj) { return obj.id === id; });
        //check if fits in sorterFilledPatterns
        //   add and select
      }
    //    1 Check if pattern is already selected if so remove pattern form selected and
    //     sortedFilledPatterns
        
    //    2 Check if pattern fit fits in the sorterFilledPatterns
    //     Add the pattern to selected 

    //    3 check if game is won.diagonals


    //    Need a way to keep track of selected patterns

    }
    render() {
        let phase1 = this.state.challangePatternsPhase1.map((pattern, index) =>
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
                    <DiamondSorter selectedPatterns={this.state.selectedPatterns} />
                </div>
            </div>
        )
    }
}

export { SimpleSorter }