import React from 'react';
import '../../content/css/mark.css';

class Mark extends React.Component {
    render() {
        return (
                <div className="mark">
                    <div className="hair">
                        <div className="face">
                        <div className="forehead"></div>
                            <div className="eye-brow-row">
                                <div className="eye-brow"></div>
                                <div className="eye-brow"></div>
                            </div>
                            <div className="eye-row">
                                <div className="eye">
                                    <div className="iris">
                                        <div className="pupil"></div>
                                    </div>
                                </div>
                                <div className="eye">
                                    <div className="iris">
                                        <div className="pupil"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="nose-row">
                                <div className="nose"></div>
                            </div>
                            <div className="mouth-row">
                                <div className={this.props.speaking ? "mouth speaking" : "mouth"}></div>
                            </div>
                            <div className="forehead"></div>
                        </div>
                    </div>
                    <div className="neck"></div>
                    <div className="torso"></div>
                </div>
        );
    }
}

export default Mark