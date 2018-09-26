import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './home.jsx';
import { DiamondCopyChallenge } from './mimic/diamond-copy-challenge.jsx';
import { DiamondOppositeChallenge } from './mimic/diamond-reverse-challenge.jsx';
import { DiamondOddOneOutChallenge } from './mimic/diamond-odd-one-out-challenge.jsx';
import  {SimpleSorter}  from './shape-sorter/simple-sorter.jsx';

import './content/css/main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <BrowserRouter>
            //     <div>
            //         <Route exact path="/" component={Home} />
            //         <Route path="/mimic/1" component={DiamondCopyChallenge} />
            //         <Route path="/mimic/2" component={DiamondOppositeChallenge} />
            //         <Route path="/mimic/3" component={DiamondOddOneOutChallenge} />

            //     </div>
            // </BrowserRouter>
        <SimpleSorter />
        );
    }
}

export {App}