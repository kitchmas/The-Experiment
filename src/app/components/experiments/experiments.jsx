import React from 'react';

import Diamond from '../diamond/diamond.jsx';

import '../../content/css/experiment.css';


const Experiments = () => {
    return (
        <div className="content-wrapper">
            <h1>Experiments</h1>
            <div className="experiments-wrapper">
                <div className="experiment">
                    <Diamond
                    topDiamondClass="diamond-red"
                    rightDiamondClass="diamond-green"
                    leftDiamondClass="diamond-blue"
                    bottomDiamondClass="diamond-black"
                    />
                </div>
                <div className="experiment">
                <Diamond
                    topDiamondClass="diamond-red"
                    rightDiamondClass="diamond-green"
                    leftDiamondClass="diamond-blue"
                    bottomDiamondClass="diamond-black"
                    />
                </div>
                <div className="experiment">
                <Diamond
                    topDiamondClass="diamond-red"
                    rightDiamondClass="diamond-green"
                    leftDiamondClass="diamond-blue"
                    bottomDiamondClass="diamond-black"
                    />
                </div>
            </div>
        </div>
    )
}

export default Experiments