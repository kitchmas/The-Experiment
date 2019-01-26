import React from 'react';

import '../../content/css/board-game-help.css';

import SelectCell from '../../content/imgs/SelectCell.png';
import SelectTile from '../../content/imgs/SelectTile.png';
import ConfirmTile from '../../content/imgs/ConfirmTile.png';
import SeedSoil from '../../content/imgs/SeedSoil.png';
import WetSoil from '../../content/imgs/WetSoil.png';
import Plant from '../../content/imgs/Plant.png';
import Budding from '../../content/imgs/Budding.png';
import Sprout from '../../content/imgs/Sprout.png';
import Dead from '../../content/imgs/Dead.png';
import Wilted from '../../content/imgs/Wilted.png';
import FireAttack from '../../content/imgs/FireAttack.png';
import WeedFullyGrown from '../../content/imgs/WeedFullyGrown.png';
import WeedOvergrown from '../../content/imgs/WeedOvergrown.png';
import WeedSpreading from '../../content/imgs/WeedSpreading.png';
import WeedSprout from '../../content/imgs/WeedSprout.png';

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
                    <div className={this.state.showHelp ? "help-page shown" : "help-page hide"}>
                        <div className="help-page-content">
                            <div className="space-between-wrapper heading">
                                <h1>Rules</h1>
                                <div onClick={this.helpIconClicked} className="help-icon close">&#10006;</div>
                            </div>
                            <section>
                                <h2>About</h2>
                                <p>
                                    Blah blah is a game about managing a micro garden. Lay down some soil, soe and
                                    water seeds until they grow into plants. But be carefull, once all the space in the garden is gone the game will end.
                                    Try and gain as many points as you can before filling up the garden.
                           </p>
                                <p>
                                    Blah blah is a game about managing a micro garden. lay down some soil, soe and
                                    water seeds until they grow into plants. But be carefull, once all the space in the garden is gone the game will end.
                                    Try and gain as many points as you can before filling up the garden.
                           </p>
                            </section>
                            <section>
                                <h2>How To play</h2>
                                <section>
                                    <h3 className="selecting-a-cell-heading">Selecting a cell</h3>
                                    <p>
                                        First select any tile on the board. This will highlight a cross section and bring up the tile selection bag below the board.
                            </p>
                                    <img className="rules-img" src={SelectCell} />
                                </section>
                                <section>
                                    <h3>Selecting a tile</h3>
                                    <p>
                                        Next Select the tile you would like to place from the tile bag below. Only a Soild or Rock Tile can be placed on an empty tile.
                            </p>
                                    <img className="rules-img" src={SelectTile} />
                                </section>
                                <section>
                                    <h3>Placing a tile</h3>
                                    <p>
                                        The selected tile will be placed in the higlighted cross section. If you are happy with your placement. Otherwise press undo to undo your turn.
                                </p>
                                    <img className="rules-img" src={ConfirmTile} />
                                </section>
                                <section>
                                    <h3>Transforming a tile</h3>
                                    <p>
                                        Certain tiles can be placed ontop of other tiles to "Transform" that tile. Placing the Water tile on the Soil tile will create a Wet Soil tile.
                                </p>
                                    <img className="rules-img" src={WetSoil} />
                                    <p>
                                        Placing a Seed tile on a Soild tile will create a Seed Soil tile.
                                </p>
                                    <img className="rules-img" src={SeedSoil} />
                                </section>
                                <section>
                                    <h3>Growing a plant</h3>
                                    <p>
                                        By combining a Soil tile with a Water tile and Seed tile will create a Sprout tile.
                                </p>
                                    <img className="rules-img" src={Sprout} />
                                    <p>
                                        A Sprout tile can be watered By placing a Water Tile ontop. A sprout tile will grow into a Budding if watered.
                                </p>
                                    <img className="rules-img" src={Budding} />
                                    <p>
                                        A Budding tile will grow into a Plant if watered.
                                </p>
                                    <img className="rules-img" src={Plant} />
                                </section>
                                <section>
                                    <h3>Wilting a plant</h3>
                                    <p>
                                        If a Plant tile is left for too many turns without being Watered the plant will start to wilt.
                                </p>
                                    <img className="rules-img" src={Wilted} />
                                    <p>
                                        If a Wilted Plant Tile is not Watered then the plant will die. A Dead plant cannot be removed or brought back to life by Watering.
                                </p>
                                    <img className="rules-img" src={Dead} />
                                </section>
                                <section>
                                    <h3>Clearing tiles with a fire plant</h3>
                                    <p>
                                        The only way to clear un wanted tiles is by growing a Fire Plant from a Fire Seed.
                                        Once fully grown a Fire Plant will completley remove any adjacent tiles. Including any touching Fire Plants.
                                </p>
                                    <img className="rules-img" src={FireAttack} />
                                </section>
                                <section>
                                    <h3>Weeds</h3>
                                    <p>
                                        Empty Soil or Wet Soil Tiles have a chance of growing a Weed Sprout Tile.
                                </p>
                                    <img className="rules-img" src={WeedSprout} />
                                    <p>
                                        Weed Sprout tiles will grow each turn until Fully Grown.
                                </p>
                                    <img className="rules-img" src={WeedFullyGrown} />
                                    <p>
                                        Once Fully Grown a weed will Start Sprouting in ajacent tiles.
                                </p>
                                    <img className="rules-img" src={WeedSpreading} />
                                    <p>
                                        Be careful weeds can quickly over take your garden.
                                </p>
                                    <img className="rules-img" src={WeedOvergrown} />
                                </section>
                            </section>
                        </div>
                    </div>
            </div>
        )
    }
}

export default BoardGameHelp