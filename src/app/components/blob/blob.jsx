import React from 'react';
import '../../../content/css/blob.css';

import Draggable from 'react-draggable';

class Blob extends React.Component {
    constructor(props) {
        super(props);
        this.timeHeld = 0;
        this.timer = null;
    }
    state = {
        animateClass: "",
        animateMovedId: "",
        showBlob1: "hidden",
        showBlob2: "hidden",
        showBlob3: "hidden",
        showBlob4: "hidden",
        showTriangles: "hidden",
        dragged: true
    }
    componentDidMount() {
        this.timeHeld = 0;
    }
    blobOnDown = () => {
        if (this.timeHeld < 0.6) {
            this.setState({ animateClass: "round", animateMovedId: "" });
        }
        this.timer = setInterval(
            () => {
                if (this.timeHeld === 2) {
                    this.setState({ showBlob1: "show" });
                }
                if (this.timeHeld === 3) {
                    this.setState({ showBlob2: "show" });
                }
                if (this.timeHeld === 4) {
                    this.setState({ showBlob3: "show" });
                }
                if (this.timeHeld === 5) {
                    this.setState({ showBlob4: "show" });
                }
                if (this.timeHeld === 6) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin" }));
                }
                if (this.timeHeld === 8) {
                    this.setState({ showTriangles: "show" });
                }
                if (this.timeHeld === 10) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " color-transition" }));
                }
                if (this.timeHeld === 12) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " align-straight" }));
                }
                this.timeHeld += 0.5;
            },
            500
        );
    }
    blobOnUp = () => {
        clearInterval(this.timer);
        this.timeHeld = 0;
        if (this.state.dragged) {
            this.setState({
                animateMovedId: "moved",
                animateClass: "",
                showBlob1: "hidden",
                showBlob2: "hidden",
                showBlob3: "hidden",
                showBlob4: "hidden",
                showTriangles: "hidden",
                dragged: false
            });
        } else {
            this.setState({
                animateClass: "",
                showBlob1: "hidden",
                showBlob2: "hidden",
                showBlob3: "hidden",
                showBlob4: "hidden",
                showTriangles: "hidden"
            });
        }


    }
    blobMoved = (e) => {
        this.setState({ dragged: true });
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <Draggable
                    onStart={this.blobMoved}
                    position={{ x: 0, y: 0 }}>
                    <div id={this.state.animateMovedId} className="handle" >
                        <div className={"blob-wrapper " + this.state.animateClass} >
                            <div>
                                <div className={"triangle-bottomright traingle " + this.state.showTriangles}></div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob1}></div>
                            </div>
                            <div>
                                <div className={"triangle-bottomleft traingle " + this.state.showTriangles}></div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob2}></div>
                            </div>
                            <div>
                                <div className="blob"
                                    onMouseDown={this.blobOnDown}
                                    onTouchStart={this.blobOnDown}
                                    onMouseUp={this.blobOnUp}
                                    onTouchEnd={this.blobOnUp}
                                >
                                </div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob3}></div>
                            </div>
                            <div>
                            <div className={"triangle-topright traingle " + this.state.showTriangles}></div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob4}></div>
                            </div>
                            <div>
                            <div className={"triangle-topleft traingle " + this.state.showTriangles}></div>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
}

export default Blob













