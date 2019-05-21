import React from 'react';
import firebase from 'firebase/app';

import '../../../content/css/form.css';
import '../../../content/css/village.css';

import Villager from './villager.jsx';
class Village extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        name: "Thom",
        hairStyle: "short",
        hairColour: "#fef160",
        skinColour: "#fff9de",
        shirtColour: "#87d37c",
        trouserColour: "#22313f"
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    post = (e) => {
        e.preventDefault();

        var db = firebase.firestore();

        db.collection("villagers").add({
            name: this.state.name,
            hairStyle: this.state.hairStyle,
            hairColour: this.state.hairColour,
            skinColour: this.state.skinColour,
            shirtColour: this.state.shirtColour,
            trouserColour: this.state.trouserColour
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                this.setState({
                    name: "",
                    hairStyle: "",
                    hairColour: "",
                    skinColour: "",
                    shirtColour: "",
                    trouserColour: ""
                }, this.props.submitted())
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    render() {
        return (
            <form className="experiment-form">
                <h1>Villager Creator</h1>
                <div className="villager-creator">
                    <div className="villager-edit-box">
                        <h2>{this.state.name}</h2>
                        <div className="center-wrapper">
                            <Villager
                                name={this.state.name}
                                hairStyle={this.state.hairStyle}
                                hairColour={this.state.hairColour}
                                skinColour={this.state.skinColour}
                                shirtColour={this.state.shirtColour}
                                trouserColour={this.state.trouserColour}
                            />
                        </div>
                    </div>
                    <div className="form-fields">
                        <label>
                            Name:
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange} />
                        </label>
                        <label>
                            Hair Style
                    <select name="hairStyle" value={this.state.hairStyle} onChange={this.onChange}>
                                <option value="short">Short</option>
                                <option value="medium-short">Medium Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                                <option value="perm">Perm</option>
                                <option value="buzz">Buzz</option>
                                <option value="mo-hawk">Mohawk</option>
                            </select>
                        </label>
                        <label>
                            Hair Colour:
                        <input type="color" name="hairColour" id="hair-colour" value={this.state.hairColour} onChange={this.onChange} style={{ backgroundColor: this.state.hairColour }} />
                        </label>
                        <label>
                            Skin Colour:
                        <input type="color" name="skinColour" id="skin-colour" value={this.state.skinColour} onChange={this.onChange} style={{ backgroundColor: this.state.skinColour }} />
                        </label>
                        <label>
                            Shirt Colour:
                        <input type="color" name="shirtColour" id="shirt-colour" value={this.state.shirtColour} onChange={this.onChange} style={{ backgroundColor: this.state.shirtColour }} />
                        </label>
                        <label>
                            Trouser Colour:
                        <input type="color" name="trouserColour" id="trouser-colour" value={this.state.trouserColour} onChange={this.onChange} style={{ backgroundColor: this.state.trouserColour }} />
                        </label>
                        <button className="experiment-button submit" onClick={this.post}>Add</button>
                    </div>
                </div>
            </form>
        )
    }
}
export default Village