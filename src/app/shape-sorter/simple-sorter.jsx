import React from 'react';
import { DiamondTarget } from './diamond-target.jsx';
import { DiamondGreen } from './diamond-draggable-green.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '../content/css/shape-sorter.css';

class SimpleSorter extends React.Component {
    render() {
        return (
            <div>
                <DiamondGreen />                
                <DiamondTarget />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(SimpleSorter)