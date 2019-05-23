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
        villagerRotateStatus: "front",
        villagerPosition: "",
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

        if (!["short", "medium-short", "medium", "medium-alternative", "long", "perm", "buzz", "mo-hawk", "quiff", "quiff-side", "billy-talent"].includes(this.state.hairStyle)) {
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
    _rotateLeft = () => {
        switch (this.state.villagerRotateStatus) {
            case "front":
                this.setState({
                    villagerPosition: "side-on",
                    villagerRotateStatus: "left"
                })
                break;
            case "left":
                this.setState({
                    villagerPosition: "backwards",
                    villagerRotateStatus: "back"
                })
                break;
            case "back":
                this.setState({
                    villagerPosition: "side-on",
                    villagerRotateStatus: "right"
                })
                break;
            case "right":
                this.setState({
                    villagerPosition: "front",
                    villagerRotateStatus: "front"
                })
                break;
            default:
                this.setState({
                    villagerPosition: "front",
                    villagerRotateStatus: ""
                })
        }
    }
    _rotateRight = () => {
        switch (this.state.villagerRotateStatus) {
            case "front":
                this.setState({
                    villagerPosition: "side-on",
                    villagerRotateStatus: "right"
                })
                break;
            case "right":
                this.setState({
                    villagerPosition: "backwards",
                    villagerRotateStatus: "back"
                })
                break;
            case "back":
                this.setState({
                    villagerPosition: "side-on",
                    villagerRotateStatus: "left"
                })
                break;
            case "left":
                this.setState({
                    villagerPosition: "front",
                    villagerRotateStatus: "front"
                })
                break;
            default:
                this.setState({
                    villagerPosition: "front",
                    villagerRotateStatus: ""
                })
        }
    }
    _onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (!this.state.valid)
                this.validateFields();
        });
    }
    _post = (e) => {
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
    _cancel = () => {
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
                    <button className="experiment-button cancel" onClick={this._cancel}><span>✕</span></button>
                </div>
                <div className="villager-creator">
                    <div className="villager-view">
                        <div className="villager-screen">
                            <h2>{this.state.name}</h2>
                            <div className="center-wrapper">
                                <Villager
                                    position={this.state.villagerPosition}
                                    name={this.state.name}
                                    hairStyle={this.state.hairStyle}
                                    hairColour={this.state.hairColour}
                                    skinColour={this.state.skinColour}
                                    shirtColour={this.state.shirtColour}
                                    trouserColour={this.state.trouserColour}
                                />
                            </div>
                        </div>
                        <div className="space-between-wrapper villager-rotater">
                            <i className="arrow left" onClick={this._rotateLeft}></i>
                            <i className="arrow right" onClick={this._rotateRight}></i>
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
                                onChange={this._onChange} />
                        </label>
                        <label>
                            Hair Style
                            {this.state.hairStyleInvalidMessage.length > 0 ? <div className="validation-error">{this.state.hairStyleInvalidMessage}</div> : null}
                            <select name="hairStyle" value={this.state.hairStyle} onChange={this._onChange} required >
                                <option value="short">Short</option>
                                <option value="medium-short">Medium Short</option>
                                <option value="medium">Medium</option>
                                <option value="medium-alternative">Medium Alternative</option>
                                <option value="long">Long</option>
                                <option value="quiff">Quiff</option>
                                <option value="quiff-side">Quiff Side Parted</option>
                                <option value="perm">Perm</option>
                                <option value="buzz">Buzz</option>
                                <option value="mo-hawk">Mohawk</option>
                                <option value="billy-talent">Billy Talent</option>
                            </select>
                        </label>
                        <label>
                            Hair Colour:
                            {this.state.hairColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.nameInvalidMessage}</div> : null}
                            <input type="color"
                                name="hairColour"
                                id="hair-colour"
                                required
                                value={this.state.hairColour}
                                onChange={this._onChange}
                                style={{ backgroundColor: this.state.hairColour }} />
                        </label>
                        <label>
                            Skin Colour:
                            {this.state.skinColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.skinColourInvalidMessage}</div> : null}
                            <input type="color"
                                name="skinColour"
                                id="skin-colour"
                                required
                                value={this.state.skinColour}
                                onChange={this._onChange}
                                style={{ backgroundColor: this.state.skinColour }} />
                        </label>
                        <label>
                            Shirt Colour:
                            {this.state.shirtColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.shirtColourInvalidMessage}</div> : null}
                            <input type="color"
                                name="shirtColour"
                                id="shirt-colour"
                                required
                                value={this.state.shirtColour}
                                onChange={this._onChange}
                                style={{ backgroundColor: this.state.shirtColour }} />
                        </label>
                        <label>
                            Trouser Colour:
                            {this.state.trouserColourInvalidMessage.length > 0 ? <div className="validation-error">{this.state.trouserColourInvalidMessage}</div> : null}
                            <input type="color"
                                name="trouserColour"
                                id="trouser-colour"
                                required
                                value={this.state.trouserColour}
                                onChange={this._onChange}
                                style={{ backgroundColor: this.state.trouserColour }} />
                        </label>
                        <button type="submit" className="experiment-button submit" onClick={this._post}>Create</button>
                    </div>
                </div>
            </form>
        )
    }
}
export default VillagerCreator