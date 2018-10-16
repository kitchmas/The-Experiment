import React from 'react';

import '../content/css/diamond.css';
import '../content/css/diamond-sorter.css';

class DiamondSorter extends React.Component {
    render() {
        return (
            <div className="relative-wrapper">
                <div onClick={() => this.props.onClick()} className={this.props.animateDiamondClass + ' diamond-holder diamond-sorter'}>
                    <div className={this.props.pattern[0].value != 0 ? "diamond diamond-" + this.props.pattern[0].value : "diamond " + this.props.answerPatterns[0]} >
                    </div>
                    <div className={this.props.pattern[1].value != 0 ? "diamond diamond-" + this.props.pattern[1].value : "diamond " + this.props.answerPatterns[1]} >
                    </div>
                    <div className={this.props.pattern[2].value != 0 ? "diamond diamond-" + this.props.pattern[2].value : "diamond " + this.props.answerPatterns[2]} >
                    </div>
                    <div className={this.props.pattern[3].value != 0 ? "diamond diamond-" + this.props.pattern[3].value : "diamond " + this.props.answerPatterns[3]} >
                    </div>
                </div>
                <div onClick={() => this.props.onClick()} className="rotate-wrapper">
                    <i class="fas fa-sync-alt"></i>
                </div>
            </div>
        );
    }
}

export { DiamondSorter }













