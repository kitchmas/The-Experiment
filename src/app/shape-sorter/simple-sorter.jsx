import React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '../content/css/shape-sorter.css';
import '../content/css/carousel.css';

class SimpleSorter extends React.Component {
    render() {
        return (
            <div className="carousel">
                <div>
                    <div className="diamond diamond-red">
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
                </div>
                <div>
                    <div className="diamond diamond-red">
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
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(SimpleSorter)