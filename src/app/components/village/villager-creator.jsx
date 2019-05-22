import React from 'react';
import firebase from 'firebase/app';

import '../../../content/css/form.css';
import '../../../content/css/villager-creator.css';

import Villager from './villager.jsx';

class VillagerCreator extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        name: "",
        nameInvalidMessage: "",
        hairStyle: "short",
        hairStyleInvalidMessage: "",
        hairColour: "#fef160",
        hairColourInvalidMessage: "",
        skinColour: "#fff9de",
        skinColourInvalidMessage: "",
        shirtColour: "#87d37c",
        shirtColourInvalidMessage: "",
        trouserColour: "#22313f",
        trouserColourInvalidMessage: "",
        valid: true
    }
    validateFields = () => {
        let nameInvalidMessage,
            hairStyleInvalidMessage,
            hairColourInvalidMessage,
            skinColourInvalidMessage,
            shirtColourInvalidMessage,
            trouserColourInvalidMessage,
            invalid = false;

        if (this.state.name.length < 1) {
            nameInvalidMessage = "Name cannot be blank";
            invalid = true;
        } else if (this.state.name.length > 22) {
            nameInvalidMessage = "Name caanot be over 22 character";
            invalid = true;
        } else {
            nameInvalidMessage = "";
        }



        if (!["short", "medium-short", "medium", "long", "perm", "buzz", "mo-hawk"].includes(this.state.hairStyle)) {
            hairStyleInvalidMessage = "Please enter a valid hair style";
            invalid = true;
        } else {
            hairStyleInvalidMessage = "";
        }

        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.state.hairColour)) {
            hairColourInvalidMessage = "Please select a valid colour";
            invalid = true;
        } else {
            hairColourInvalidMessage = "";
        }

        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.state.skinColour)) {
            skinColourInvalidMessage = "Please select a valid colour";
            invalid = true;
        } else {
            skinColourInvalidMessage = "";
        }

        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.state.shirtColour)) {
            shirtColourInvalidMessage = "Please select a valid colour";
            invalid = true;
        } else {
            shirtColourInvalidMessage = "";
        }

        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.state.trouserColour)) {
            trouserColourInvalidMessage = "Please select a valid colour";
            invalid = true;
        } else {
            trouserColourInvalidMessage = "";
        }

        this.setState({
            valid: !invalid,
            nameInvalidMessage,
            hairStyleInvalidMessage,
            hairColourInvalidMessage,
            skinColourInvalidMessage,
            shirtColourInvalidMessage,
            trouserColourInvalidMessage
        })

        return invalid;
    }
    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value }, () => {
            if (!this.state.valid)
                this.validateFields();
        });
    }
    post = (e) => {
        e.preventDefault();

        let invalid = this.validateFields();

        if (invalid)
            return;

        var db = firebase.firestore();
        db.collection("villagers").add({
            name: this.state.name,
            hairStyle: this.state.hairStyle,
            hairColour: this.state.hairColour,
            skinColour: this.state.skinColour,
            shirtColour: this.state.shirtColour,
            trouserColour: this.state.trouserColour
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({
                    name: "",
                    hairStyle: "short",
                    hairColour: "#fef160",
                    skinColour: "#fff9de",
                    shirtColour: "#87d37c",
                    trouserColour: "#22313f"
                }, this.props.submitted())
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    cancel = () => {
        this.setState({
            name: "",
            hairStyle: "short",
            hairColour: "#fef160",
            skinColour: "#fff9de",
            shirtColour: "#87d37c",
            trouserColour: "#22313f"
        }, this.props.canceled())
    }
    render() {
        return (
            <form className="experiment-form villager-form">
                <div className="space-between-wrapper">
                    <h1>Villager Creator</h1>
                    <button className="experiment-button cancel" onClick={this.cancel}>&times;</button>
                </div>
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
                            {this.state.nameInvalidMessage.length > 0 ? <div className="validation-error">{this.state.nameInvalidMessage}</div> : null}
                            <input type="text"
                                name="name"
                                id="name"
                                required
                                maxLength="35"
                                value={this.state.name}
                                onChange={this.onChange} />
                        </label>
                        <label>
                            Hair Style
                        <select name="hairStyle" value={this.state.hairStyle} onChange={this.onChange} required >
                                <option value="short">Short</option>
                                <option value="medium-short">Medium Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                                <option value="perm">Perm</option>
                                <option value="buzz">Buzz</option>
                                <option value="mo-hawk">Mohawk</option>
                            </select>
                            {this.state.hairStyleInvalidMessage.length > 0 ? <div className="validation-error">{this.state.hairStyleInvalidMessage}</div> : null}
                        </label>
                        <label>
                            Hair Colour:
                        <input type="color"
                                name="hairColour"
                                id="hair-colour"
                                required
                                value={this.state.hairColour}
                                onChange={this.onChange}
                                style={{ backgroundColor: this.state.hairColour }} />
                            {this.state.hairColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.nameInvalidMessage}</div> : null}
                        </label>
                        <label>
                            Skin Colour:
                        <input type="color"
                                name="skinColour"
                                id="skin-colour"
                                required
                                value={this.state.skinColour}
                                onChange={this.onChange}
                                style={{ backgroundColor: this.state.skinColour }} />
                            {this.state.skinColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.skinColourInvalidMessage}</div> : null}
                        </label>
                        <label>
                            Shirt Colour:
                        <input type="color"
                                name="shirtColour"
                                id="shirt-colour"
                                required
                                value={this.state.shirtColour}
                                onChange={this.onChange}
                                style={{ backgroundColor: this.state.shirtColour }} />
                            {this.state.shirtColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.shirtColourInvalidMessage}</div> : null}
                        </label>
                        <label>
                            Trouser Colour:
                        <input type="color"
                                name="trouserColour"
                                id="trouser-colour"
                                required
                                value={this.state.trouserColour}
                                onChange={this.onChange}
                                style={{ backgroundColor: this.state.trouserColour }} />
                            {this.state.trouserColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.trouserColourInvalidMessage}</div> : null}
                        </label>
                        <button type="submit" className="experiment-button submit" onClick={this.post}>Create</button>
                    </div>
                </div>
            </form>
        )
    }
}
export default VillagerCreator