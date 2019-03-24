import React from 'react';
import '../../../content/nes-css/css/nes.css';
import '../../../content/css/nes-icon.css';

class NesIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <i className="nes-mario nes-nav-icon"></i>
        );
    }
}

export default NesIcon