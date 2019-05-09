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
        backgroundClass:"",
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
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    blobOnDown = () => {
        if (this.timeHeld < 0.6) {
            this.setState({ animateClass: "round", animateMovedId: "" });
        }
        this.timer = setInterval(
            () => {
                if (this.timeHeld === 1) {
                    this.setState({ showBlob1: "show" });
                }
                if (this.timeHeld === 4) {
                    this.setState({ showBlob2: "show" });
                }
                if (this.timeHeld === 6) {
                    this.setState({ showBlob3: "show" });
                }
                if (this.timeHeld === 8) {
                    this.setState({ showBlob4: "show" });
                }
                if (this.timeHeld === 12) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin" }));
                }
                if (this.timeHeld === 16) {
                    this.setState({ showTriangles: "show" });
                }
                if (this.timeHeld === 20) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " color-transition" }));
                }
                if (this.timeHeld === 22) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " triangle-spin" }));
                }
                if (this.timeHeld === 26) {
                }
                if (this.timeHeld === 30) {
                    this.setState((prev) => ({ backgroundClass: prev.backgroundClass += " darkness" }));
                }
                if (this.timeHeld === 34) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " borders-on" }));
                }
                if (this.timeHeld === 38) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin-speed-up-3" }));
                }
                if (this.timeHeld === 42) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin-speed-up-2" }));
                }
                if (this.timeHeld === 46) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin-speed-up-1" }));
                }
                if (this.timeHeld === 50) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " spin-speed-up-0" }));
                }
                if (this.timeHeld === 54) {
                    this.setState((prev) => ({ animateClass: prev.animateClass += " grow" }));
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
                backgroundClass: "",
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
                backgroundClass: "",
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
            <div className={"center-page-wrapper blob-page " + this.state.backgroundClass}>
                <Draggable
                    onStart={this.blobMoved}
                    position={{ x: 0, y: 0 }}>
                    <div id={this.state.animateMovedId} className="handle" >
                        <div className={"blob-wrapper " + this.state.animateClass} >
                            <div>
                                <div className={"triangle-bottomright triangle  " + this.state.showTriangles}></div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob1}></div>
                            </div>
                            <div>
                                <div className={"triangle-bottomleft triangle  " + this.state.showTriangles}></div>
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
                            <div className={"triangle-topright triangle  " + this.state.showTriangles}></div>
                            </div>
                            <div>
                                <div className={"blob blob-small " + this.state.showBlob4}></div>
                            </div>
                            <div>
                            <div className={"triangle-topleft triangle  " + this.state.showTriangles}></div>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
}

export default Blob













