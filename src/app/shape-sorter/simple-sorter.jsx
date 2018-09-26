import React from 'react';

import DragScroll from 'react-dragscroll';

import { Diamond } from '../diamond/diamond.jsx';
import { DiamondPallete } from './diamond-palette.jsx';

import '../content/css/shape-sorter.css';
import '../content/css/carousel.css';

class SimpleSorter extends React.Component {
    state = {
        animateDiamondClass:"",
        patterns:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
    }
    redClicked = () => {
        this.setState({
            animateDiamondClass: "insert-diamond"
        })
    }
    render() {
        return (
            <div className="full-page-fex-col-wrapper">
                <div className="fade-wrapper">
                    <div className="fade-left"></div>
                    <DragScroll className="carousel" width={1500}>
                    <div>
                            <DiamondPallete pattern={this.state.patterns[0]} />
                            </div>

                        {/* <div>
                            <div onClick={this.redClicked} className={this.state.animateDiamondClass + " diamond diamond-red"}>
                            </div>
                        </div>
                        <div>
                            <div className="diamond diamond-blue">
                            </div>
                        </div>
                        <div>
                            <div className="diamond diamond-green">
                            </div>
                        </div>
                        <div>
                            <div className="diamond diamond-black">
                            </div>
                        </div> */}
                    </DragScroll>
                    <div className="fade-right"></div>
                </div>
                <div className="shape-sorter-wrapper">
                    <Diamond />
                </div>
            </div>
        )
    }
}

export {SimpleSorter}