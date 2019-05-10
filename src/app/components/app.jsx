import React, { Suspense, lazy } from 'react';
import { library } from '@fortawesome/fontawesome/index'
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt'
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight'
library.add(faSyncAlt,faArrowRight);
import history from '../helpers/history.js';
import { Router, Route, Link } from 'react-router-dom';
import '../../content/css/main.css';

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
const CanIleaveMyWashingOut = lazy(() => import('./washing/can-i-leave-washing-out.jsx'));
const BaconEgg = lazy(() => import('./bacon egg/bacon-egg.jsx'));
const SoundBoard = lazy(() => import('./sound board/sound-board.jsx'));

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
                        <Route exact path="/sound-board" component={SoundBoard} />
                        <Route exact path="/bacon-and-eggs" component={BaconEgg} />
                        <Route exact path="/can-i-leave-my-washing-out" component={CanIleaveMyWashingOut} />
                        <Route exact path="/battle-boy" component={Nes} />
                        <Route exact path="/blob" component={Blob} />
                        <Route path="/day-and-night" component={WeatherGlobe} />
                        <Route exact path="/" component={Experiments} />
                        <Route exact path="/about" component={About} />
                        <Route path="/mimic/1" component={DiamondCopyChallenge} />
                        <Route path="/mimic/2" component={DiamondOppositeChallenge} />
                        <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />
                        <Route path="/sorter/1" component={SimpleSorter} />
                        <Route path="/micro-garden" component={Game} />
                        </div>
                    </div>
                </Suspense>
            </Router>

        );
    }
}

export default App