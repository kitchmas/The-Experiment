import React from 'react';
import fontAwesome from '@fortawesome/fontawesome'
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt'
fontAwesome.library.add(faSyncAlt);

import { BrowserRouter, Route } from 'react-router-dom';

import Home  from './home/home.jsx';
import NavBar  from './nav/nav-bar.jsx';
import DiamondCopyChallenge  from './mimic/diamond-copy-challenge.jsx';
import DiamondOppositeChallenge  from './mimic/diamond-opposite-challenge.jsx';
import DiamondOddOneOutChallenge  from './mimic/diamond-odd-one-out-challenge.jsx';
import  {SimpleSorter}  from './shape-sorter/simple-sorter-challenge.jsx';

import '../content/css/main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/mimic/1" component={DiamondCopyChallenge} />
                    <Route path="/mimic/2" component={DiamondOppositeChallenge} />
                    <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />
                    <NavBar />
                </div>
            </BrowserRouter>
            
        );
    }
}

export {App}