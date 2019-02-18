import React from 'react';

import '../../../content/css/weather-globe.css';
import '../../../content/css/weather-globe-icon.css';

const WeatherGlobeIcon = () => {
    return (
            <div className="globe weather-globe-icon">
                <div className="tree">
                    <div className="tree-top"></div>
                    <div className="tree-body"></div>
                    <div className="tree-trunk"></div>
                </div>
                <div className="ground"></div>
            </div>
    )
}

export default WeatherGlobeIcon