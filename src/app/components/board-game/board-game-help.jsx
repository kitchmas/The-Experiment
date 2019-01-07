import React from 'react';

import '../../content/css/board-game.css';

class BoardGameHelp extends React.Component {
    state = {
        showHelp: false
    }
    helpIconClicked = () => {
        this.setState((prev) => ({ showHelp: prev.showHelp ? false : true }));
    }
    render() {
        return (
            <div>
                <div onClick={this.helpIconClicked} className="help-icon">?</div>
                {this.state.showHelp ?
                    <div className="help-page">HI</div> : null
                }
            </div>
        )
    }
}

export default BoardGameHelp