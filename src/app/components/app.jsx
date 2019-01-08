import React from 'react';
import fontAwesome from '@fortawesome/fontawesome'
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt'
fontAwesome.library.add(faSyncAlt);

import { BrowserRouter, Route } from 'react-router-dom';

import '../content/css/main.css';

import About  from './about/about.jsx';
import Home  from './home/home.jsx';
import Experiments  from './experiments/experiments.jsx';
import NavBar  from './nav/nav-bar.jsx';
import DiamondCopyChallenge  from './mimic/diamond-copy-challenge.jsx';
import DiamondOppositeChallenge  from './mimic/diamond-opposite-challenge.jsx';
import DiamondOddOneOutChallenge  from './mimic/diamond-odd-one-out-challenge.jsx';
import SimpleSorter from './shape-sorter/simple-sorter-challenge.jsx';


import Game  from './board-game/game.jsx';
import Mark  from './mark/mark.jsx';
import VideoPhone  from './phone/video-phone.jsx';



class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                <NavBar />
                    {/* <Route exact path="/" component={Phone} /> */}
                    {/* <Route exact path="/" component={VideoPhone} />  */}
                    <Route exact path="/" component={Game} />
                    <Route path="/mimic/1" component={DiamondCopyChallenge} />
                    <Route path="/mimic/2" component={DiamondOppositeChallenge} />
                    <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />
                    <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />
                    <Route path="/sorter/1" component={SimpleSorter} />
                    <Route path="/experiments" component={Experiments} />
                </div>
            </BrowserRouter>
            
        );
    }
}

export {App}