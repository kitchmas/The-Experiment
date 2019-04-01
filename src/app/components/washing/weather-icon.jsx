import React from 'react';

import '../../../content/css/can-i-leave-washing.css';

const WeatherIcon = (props) => {
    return (
        <div onClick={props.refresh} className={"cloud-wrapper " + props.weather}  >
            <div className="cloud">
                <div className="blob-one"></div>
                <div className="blob-two">
                    <div className="face">
                        <div className="eyebrow-row">
                            <div className="eyebrow">
                            </div>
                            <div className="eyebrow">
                            </div>
                        </div>
                        <div className="eye-row">
                            <div className="eye">
                                <div className="pupil"></div>
                            </div>
                            <div className="eye">
                                <div className="pupil"></div>
                            </div>
                        </div>
                        <div className="mouth"></div>
                    </div>
                </div>
                <div className="blob-three"></div>
            </div>
            <div className="rain-wrapper">
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
                <div className="rain-drop"></div>
            </div>
        </div>
    )
}

export default WeatherIcon