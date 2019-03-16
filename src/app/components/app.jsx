import React, { Suspense, lazy } from 'react';
import { library } from '@fortawesome/fontawesome/index'
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt'
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight'
library.add(faSyncAlt,faArrowRight);
import history from '../helpers/history.js';
import { Router, Route, Link } from 'react-router-dom';
import '../../content/css/main.css';
import '../../content/nes-css/css/nes.css';

const About = lazy(() => import('./about/about.jsx'));
const Home = lazy(() => import('./home/home.jsx'));
const Experiments = lazy(() => import('./experiments/experiments.jsx'));
const NavBar = lazy(() => import('./nav/nav-bar.jsx'));
const DiamondCopyChallenge = lazy(() => import('./mimic/diamond-copy-challenge.jsx'));
const DiamondOppositeChallenge = lazy(() => import('./mimic/diamond-opposite-challenge.jsx'));
const DiamondOddOneOutChallenge = lazy(() => import('./mimic/diamond-odd-one-out-challenge.jsx'));
const SimpleSorter = lazy(() => import('./shape-sorter/simple-sorter-challenge.jsx'));
const Game = lazy(() => import('./board-game/game.jsx'));
const WeatherGlobe = lazy(() => import('./globes/weather-globe.jsx'));
const Blob = lazy(() => import('./blob/blob.jsx'));
const Nes = lazy(() => import('./nes/nes.jsx'));
// import Mark  from './mark/mark.jsx';
// import VideoPhone  from './phone/video-phone.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Suspense fallback={<div>Loading...</div>}>
                    <div>
                        <NavBar />
                        <div className="content">
                       
                        <Route exact path="/nes" component={Nes} />
                        <Route exact path="/" component={Home} />
                        <Route path="/experiments" component={Experiments} />
                        <Route exact path="/about" component={About} />
                        <Route path="/mimic/1" component={DiamondCopyChallenge} />
                        <Route path="/mimic/2" component={DiamondOppositeChallenge} />
                        <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />
                        <Route path="/sorter/1" component={SimpleSorter} />
                        <Route path="/micro-garden" component={Game} />
                        <Route path="/day-and-night" component={WeatherGlobe} />
                        <Route exact path="/blob" component={Blob} />
                        </div>
                    </div>
                </Suspense>
            </Router >

        );
    }
}

export default App