import React from 'react';

import Diamond from '../diamond/diamond.jsx';
import BoardGameIcon from '../board-game/board-game-icon.jsx';

import { Link } from "react-router-dom";

import '../../content/css/experiment.css';


const Experiments = () => {
    return (
        <div className="content-wrapper">
            <h1>Experiments</h1>
            <div className="experiments-wrapper">
                <Link to="/mimic/1">
                    <div className="experiment">

                        {/* Position of children is important here so css works */}
                        <Diamond
                            topDiamondClass="diamond-red"
                        >
                        </Diamond>
                        <span className="number">1</span>
                        <span className="go">GO</span>

                    </div>
                </Link>
                <Link to="/mimic/2">
                    <div className="experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                        />
                        <span className="number">2</span>
                        <span className="go">GO</span>
                    </div>
                </Link>
                <Link to="/mimic/3">
                    <div className="experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                            leftDiamondClass="diamond-blue"
                        />
                        <span className="number">3</span>
                        <span className="go">GO</span>
                    </div>
                </Link>
                <Link to="/sorter/1">
                    <div className="experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                            leftDiamondClass="diamond-blue"
                            bottomDiamondClass="diamond-black"
                        />
                        <span className="number">4</span>
                        <span className="go">GO</span>
                    </div>
                </Link>
                <Link to="/micro_garden" style={{ textDecoration: 'none', color:'black' }}>
                    <div className="experiment">
                    <BoardGameIcon />
                        <span className="number">5</span>
                        <span className="go">GO</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Experiments