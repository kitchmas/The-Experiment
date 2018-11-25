import React from 'react';

import Tile from '../board-game/tile.jsx';
import '../../content/css/board-game.css';




class TileBag extends React.Component {
    render() {
        let tiles = this.props.tiles.map((tile, i) => {
            debugger;
            return (<Tile key={i} type={tile.type}
                onClick={(e) => this.props.newTileClicked(tile.type, e)} />
            )
        });
        return (
            <div className="tile-bag" >
                {tiles}
                {/* <div onClick={(e) => this.props.newTileClicked("fire", e)} className="fire tile-icon">Fire</div>
                <div onClick={(e) => this.props.newTileClicked("water", e)} className="water tile-icon">Water</div>
                <div onClick={(e) => this.props.newTileClicked("earth", e)} className="earth tile-icon">Earth</div>
                <div onClick={(e) => this.props.newTileClicked("ice", e)} className="ice tile-icon">Ice</div>
                <div onClick={(e) => this.props.newTileClicked("sand", e)} className="sand tile-icon">Sand</div>
                <div onClick={(e) => this.props.newTileClicked("plant", e)} className="plant tile-icon">Plant</div>
                <div onClick={(e) => this.props.newTileClicked("seed", e)} className="seed tile-icon">Seed</div>
                <div onClick={(e) => this.props.newTileClicked("wood", e)} className="wood tile-icon">Wood</div>
                <div onClick={(e) => this.props.newTileClicked("lava", e)} className="lava tile-icon">Lava</div>
                <div onClick={(e) => this.props.newTileClicked("obsidian", e)} className="obsidian tile-icon">Obsidian</div>
                <div onClick={(e) => this.props.newTileClicked("mud", e)} className="mud tile-icon">Mud</div> */}
            </div>)
    }
}

export default TileBag















// class TileBag extends React.Component {
//     render() {
//         return(
//         <div className="tile-bag">
//             <h2>Tiles</h2>
//             <div className="tile-row">
//                 <div className="tile-count"></div>
//                 <div className="fire tile-icon"></div>
//                 <div className="tile-description"><b>Fire:</b> Melts adjacent ice tiles</div>
//             </div>
//             <div className="tile-row">
//                 <div className="tile-count"></div>
//                 <div className="water tile-icon"></div>
//                 <div className="tile-description"><b>Water:</b> Expands into adjacent fire tiles, forzen by adjacent ice tiles</div>
//             </div>
//             <div className="tile-row">
//                 <div className="tile-count"></div>
//                 <div className="ice tile-icon"></div>
//                 <div className="tile-description"><b>Ice:</b> Freezes adjacent water tiles, turend to water by adjacent fire tiles</div>
//             </div>
//         </div>)
//     }
// }

// export default TileBag