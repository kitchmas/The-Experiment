import React from 'react';

import DragScroll from 'react-dragscroll';

import { DiamondSorter } from './diamond-sorter.jsx';
import { DiamondPallete } from './diamond-palette.jsx';

import '../content/css/shape-sorter.css';
import '../content/css/carousel.css';

class SimpleSorter extends React.Component {
    state = {
        animateDiamondClass: "",
        patterns: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
        selectedPatterns:[],
        testSingles:[[r,0,0,0],[0,g,0,0],[0,0,b,0],[0,0,0,bl]],
        testOppositesVertical:[[r,0,0,bl],[bl,0,0,r][g,0,0,b][b,0,0,g]],
        testOppositesHorizontal:[[0,b,g,0],[0,g,b,0],[0,r,bl,0],[0,bl,r,0]],
        

    }
    redClicked = () => {
        this.setState({
            animateDiamondClass: "insert-diamond"
        })
    }
    render() {
        var patterns = this.state.patterns.map((pattern, index) =>
            <div>
                <DiamondPallete pattern={pattern} />
            </div>);
        return (
            <div className="full-page-fex-col-wrapper">
                <div className="fade-wrapper">
                    <div className="fade-left"></div>
                    <DragScroll className="carousel" width={1500}>
                       {patterns}
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