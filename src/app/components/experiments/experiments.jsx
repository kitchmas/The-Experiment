import React from 'react';
import Diamond from '../diamond/diamond.jsx';
import BoardGameIcon from '../board-game/board-game-icon.jsx';
import WeatherGlobeIcon from '../globes/weather-globe-icon.jsx';
import BlobIcon from '../blob/blob-icon.jsx';
import NesIcon from '../nes/nes-icon.jsx';
import WeatherIcon from '../washing/weather-icon.jsx';
import BaconEggsIcon from '../bacon egg/bacon-egg.icon.jsx';
import SoundBoardIcon from '../sound board/sound-board-icon.jsx';
const Link = require('react-router-dom').Link;
import '../../../content/css/experiment.css';

const Experiments = () => {
    return (
        <div className="content-wrapper page">
            <h1>Experiments</h1>
            <div className="experiments-wrapper">
                <Link to="/sound-board" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Sound Board</h2>
                    <div className="experiment">
                        <SoundBoardIcon />
                    </div>
                </Link>
                <Link to="/bacon-and-eggs" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Bacon and Eggs</h2>
                    <div className="experiment">
                        <BaconEggsIcon />
                    </div>
                </Link>
                <Link to="/can-i-leave-my-washing-out" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Leave Washing Out</h2>
                    <div className="experiment can-i-leave-washing">
                        <WeatherIcon refresh={null} weather={null} />
                    </div>
                </Link>
                <Link to="/battle-boy" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Battle Boy</h2>
                    <div className="experiment">
                        <NesIcon />
                    </div>
                </Link>
                <Link to="/blob" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Blob</h2>
                    <div className="experiment">
                        <BlobIcon />
                    </div>
                </Link>
                <Link to="/day-and-night" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Day and Night</h2>
                    <div className="experiment">
                        <WeatherGlobeIcon />
                    </div>
                </Link>
                <Link to="/mimic/1" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Diamond 1</h2>
                    <div className="experiment diamond-experiment">
                        {/* Position of children is important here so css works */}
                        <Diamond
                            topDiamondClass="diamond-red"
                        >
                        </Diamond>
                    </div>
                </Link>
                <Link to="/mimic/2" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Diamond 2</h2>
                    <div className="experiment diamond-experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                        />
                    </div>
                </Link>
                <Link to="/mimic/3" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Diamond 3</h2>
                    <div className="experiment diamond-experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                            leftDiamondClass="diamond-blue"
                        />
                    </div>
                </Link>
                <Link to="/sorter/1" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Diamond 4</h2>
                    <div className="experiment diamond-experiment">
                        <Diamond
                            topDiamondClass="diamond-red"
                            rightDiamondClass="diamond-green"
                            leftDiamondClass="diamond-blue"
                            bottomDiamondClass="diamond-black"
                        />
                    </div>
                </Link>
                <Link to="/micro-garden" style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>Micro Garden</h2>
                    <div className="experiment">
                        <BoardGameIcon />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Experiments