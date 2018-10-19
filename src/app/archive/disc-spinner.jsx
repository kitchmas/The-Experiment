import React from 'react';

import './content/css/disc-spinner.css';

class DiscSpinner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="panel">
                <object className="logo" type="image/svg+xml" data="./app/content/imgs/TK5.svg" />
                <div className="pink-disc">
                    HI
                </div>
            </div>);
    }
}

export { DiscSpinner }
