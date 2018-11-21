import React from 'react';

import '../../content/css/board-game.css';




class TileBag extends React.Component {
    render() {
        return(
        <div className="tile-bag">
                <div className="fire tile-icon"></div>
                <div className="water tile-icon"></div>
                <div className="ice tile-icon"></div>
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