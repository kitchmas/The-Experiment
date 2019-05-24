import React from 'react';

import '../../../content/css/village-menu.css';

class VillageMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="village-menu">
                <label>
                    <i className="fas fa-search"></i>
                    <input type="range" className="zoom" name="zoom" min={15} max={100} value={this.props.zoom} onChange={this.props.onChange}></input>
                </label>
                <button className="experiment-button add" onClick={this.props.addClicked}>Add</button>
            </div>
        )
    }
}
export default VillageMenu