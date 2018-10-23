import React from 'react';

import { NavLink } from 'react-router-dom';

import '../../content/css/nav.css';
import '../../content/css/diamond-menu.css';

import  Diamond  from '../diamond/diamond.jsx';

const NavBar = () => {
    return (
        <nav>
        <ul className="nav-bar">
        <li>
   <Diamond wrapperClass="diamond-nav"
    topDiamondClass="diamond-red"
    rightDiamondClass="diamond-blue"
    leftDiamondClass="diamond-green"
    bottomDiamondClass="diamond-black" />
        </li>
            <li>
            <NavLink to="/experiments">Experiments</NavLink>
            </li>
            <li>
            <NavLink to="/about">About</NavLink>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar