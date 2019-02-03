import React from 'react';
const NavLink = require('react-router-dom').NavLink;

import '../../../content/css/home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="center-page-wrapper">
                <NavLink className="start" to="/mimic/1">Start</NavLink> 
            </div>
        );
    }
}

export default Home