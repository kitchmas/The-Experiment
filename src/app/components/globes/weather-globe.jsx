import React from 'react';

import '../../../content/css/globe.css';

const WeatherGlobe = () => {
    return (
        <div className="center-page-wrapper">
            <div className="globe">
            <div className="sun"></div>
            <div className="moon"></div>
            <div className="cloud">
                <div className="cloud-top"></div>
                <div className="cloud-body"></div>
                <div className="cloud-bottom"></div>
            </div>
                <div className="tree">
                    <div className="tree-top"></div>
                    <div className="tree-body"></div>
                    <div className="tree-trunk"></div>
                </div>
                <div className="ground"></div>
            </div>
          
        </div>
    )
}

export default WeatherGlobe