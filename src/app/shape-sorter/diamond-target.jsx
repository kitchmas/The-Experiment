import React from 'react';
import { DropTarget } from 'react-dnd'

import '../content/css/diamond.css';

class DiamondTarget extends React.Component {
    render() {
        const { connectDropTarget } = this.props
        return connectDropTarget(
            <div className='diamond-wrapper'>
                <div className="diamond diamond-red">
                </div>
                <div className="diamond diamond-blue">
                </div>
                <div className="diamond diamond-green">
                </div>
                <div className="diamond diamond-black">
                </div>
                <div className="diamond diamond-red">
                </div>
                <div className="diamond diamond-blue">
                </div>
                <div className="diamond diamond-green">
                </div>
                <div className="diamond diamond-black">
                </div>
                <div className="diamond diamond-red">
                </div>
                <div className="diamond diamond-blue">
                </div>
                <div className="diamond diamond-green">
                </div>
                <div className="diamond diamond-black">
                </div>
            </div>);
    }
}

export default DropTarget(Types.ITEM, {}, collect)(DiamondTarget)






