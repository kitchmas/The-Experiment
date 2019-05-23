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
        villagers: null,
        zoom: 50
    }
    componentDidMount = () => {
        var db = firebase.firestore();
        db.collection('villagers').get().then(querySnapshot => {
            let villagers = querySnapshot.docs.map(doc => {
                return doc.data();
            });
            this.setState({ villagers });
        });
    }
    villagerAdded = (e) => {
        this.setState({ creatorOpen: false });
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
    _onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    renderVillages = () => {
        if (this.state.villagers) {
            return this.state.villagers.map((villager,index) => {
                return <Villager key={index}
                    move={true}
                    zoom={this.state.zoom}
                    name={villager.name}
                    hairStyle={villager.hairStyle}
                    hairColour={villager.hairColour}
                    skinColour={villager.skinColour}
                    shirtColour={villager.shirtColour}
                    trouserColour={villager.trouserColour}
                />
            });
        }
        else {
            return false;
        }
    }
    render() {
        return (
            <div className="center-page-wrapper village-page">
                <div className={this.state.creatorOpen ? "village disabled" : "village"}>
                    <VillageMenu onChange={this._onChange} zoom={this.state.zoom} addClicked={this.openCreator} />
                    {this.renderVillages()}
                </div>
                {this.renderCreator()}
            </div>
        )
    }
}
export default Village