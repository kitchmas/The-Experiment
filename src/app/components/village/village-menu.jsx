import React from 'react';

import '../../../content/css/village-menu.css';

class VillageMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="village-menu">
                <button className="experiment-button" onClick={this.props.addClicked}>Add Villager</button>
            </div>
        )
    }
}
export default VillageMenu