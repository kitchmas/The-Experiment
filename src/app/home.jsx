import React from 'react';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavLink to="/mimic/1"><b>Start</b></NavLink> 
            </div>
        );
    }
}

export {Home}