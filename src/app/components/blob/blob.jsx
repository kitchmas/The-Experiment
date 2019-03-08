import React from 'react';
import '../../../content/css/blob.css';

class Blob extends React.Component {
    constructor(props) {
        super(props);
        this.timeHeld = 0;
        this.timer = null;
    }
    state = {
        animateClass: ""
    }
    componentDidMount() {
        this.timeHeld = 0;
    }
    blobOnDown = () => {
        if (this.timeHeld < 0.6) {
            this.setState({ animateClass: "round" });
        }
        this.timer = setInterval(
            () => {
                this.timeHeld += 0.5;
            },
            500
        );
    }
    blobOnUp = () => {
        clearInterval(this.timer);
        this.setState({ animateClass: "" });
        this.timeHeld = 0;
    }
    blobMoved = (e) => {
    }
    blobLetGo = (e) => {
            this.setState((prev) => ({
                voice: prev.animateClass += " moved"
            }));
    }
    render() {
        return (
            <div className="center-page-wrapper">
                <div className={"blob " + this.state.animateClass}
                    onMouseDown={this.blobOnDown}
                    onTouchStart={this.blobOnDown}
                    onMouseUp={this.blobOnUp}
                    onTouchEnd={this.blobOnUp}
                    onTouchMove={this.blobMoved}
                    onTouchMove={this.blobMoved}
                    onDragStart={this.blobMoved}
                    draggable="true"
                    onDragLeave={this.blobLetGo}
                ></div>
            </div>
        );
    }
}

export default Blob













