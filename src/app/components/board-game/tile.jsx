import React from 'react';

import '../../../content/css/board-game.css';
import { TileTypes } from './tile-enums';

class Tile extends React.Component {
    renderChildContent = () => {
       if(this.props.tile.type === TileTypes.Soil && this.props.tile.hasNestedTile){
           let x = this.props.tile.getNestedTile();
            return <div className={"nested-tile tile-icon " +  x.className}>{x.name}</div>
       } else{
           return this.props.tile.name;
       }
    }
    render() {
        return (
            <div className={this.props.tile.selected ?  "selected-tile tile-icon " + this.props.tile.className : "tile-icon " + this.props.tile.className} onClick={this.props.onClick}>
                {this.renderChildContent()}
            </div>
        )
    }
}

export default Tile