import React from 'react';
const NavLink = require('react-router-dom').NavLink;
import history from '../../helpers/history.js';
import '../../../content/css/nav.css';
import '../../../content/css/diamond-menu.css';
import Diamond from '../diamond/diamond.jsx';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    state ={
        nextpath:undefined,
        paths:[
        "/mimic/1",
        "/mimic/2",
        "/mimic/3",
        "/sorter/1",
        "/micro-garden",
        "/day-and-night",
        ],
        unlisten:null
    }
    componentDidMount() {
        this.setNextRoute();
        this.state.unlisten = history.listen((location, action) => {
            this.setNextRoute();
          });
    }
    componentDidUnmount(){
        this.state.unlisten();
    }
    setNextRoute = () =>{
        let path = window.location.pathname;
        let pathIndex = this.state.paths.indexOf(path);
        if(pathIndex != -1){
            pathIndex++;
            let nextPath = this.state.paths[pathIndex];
            this.setState({nextpath:nextPath})
        }
    }
    onClicked = () =>{
            if(this.state.nextpath){
                history.push(this.state.nextpath);
            }
    }
    render() {
        return (
            <nav>
                <ul className="nav-bar">
                    <li>
                        <NavLink to="/" >
                            <Diamond wrapperClass="diamond-nav"
                                topDiamondClass="diamond-red"
                                rightDiamondClass="diamond-blue"
                                leftDiamondClass="diamond-green"
                                bottomDiamondClass="diamond-black" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/experiments" >Experiments</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" >About</NavLink>
                    </li>
                    <li className={this.state.nextpath == undefined ? "hidden" : ""} onClick={this.onClicked}>
                       NEXT
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar