import React from 'react';

import '../../../content/css/board-game.css';
import { TileTypes } from './tile-enums';

class Tile extends React.Component {
    renderChildContent = () => {
        if (this.props.tile.type === TileTypes.Soil && this.props.tile.hasNestedTile) {
            let x = this.props.tile.getNestedTile();
            if (x.canRescore && x.score > 0 && !this.props.isTileBag) {
                return <div className={"nested-tile tile-icon " + x.className}>+{x.score}</div>
            } else {
                return <div className={"nested-tile tile-icon " + x.className}>{x.name}</div>
            }
        } else {
            if (this.props.tile.canRescore && this.props.tile.score > 0 && !this.props.isTileBag) {
                return  "+" + this.props.tile.score;
            }
            else{
                return this.props.tile.name;
            }

        }
    }
    render() {
        return (
            <div id={this.props.tile.destroyed ? "destroyed" : " "} className={this.props.tile.selected ? "selected-tile tile-icon " + this.props.tile.className : "tile-icon " + this.props.tile.className} onClick={this.props.onClick}>
                {this.renderChildContent()}
            </div>
        )
    }
}

export default Tile