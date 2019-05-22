import React from 'react';
import firebase from 'firebase/app';

import '../../../content/css/village.css';

import Villager from './villager.jsx';
import VillageMenu from './village-menu.jsx';
import VillagerCreator from './Villager-creator.jsx';


class Village extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        creatorOpen: false,
    }
    villagerAdded = (e) => {

    }
    openCreator = () => {
        this.setState({ creatorOpen: true });
    }
    creatorClosed = () => {
        this.setState({ creatorOpen: false });
    }
    renderCreator = () => {
        return this.state.creatorOpen ?
            <VillagerCreator submitted={this.villagerAdded}
                canceled={this.creatorClosed} /> : null
    }
    render() {
        return (
            <div className="center-page-wrapper village-page">
                <div className="village">
                <VillageMenu addClicked={this.openCreator} />
                </div>
                {this.renderCreator()}
            </div>
        )
    }
}
export default Village