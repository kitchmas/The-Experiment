import React from 'react';

import '../../../content/css/diamond-menu.css';

class DiamondMenu extends React.Component{
    render(){
        return(<div className="center-wrapper">
        <div className="diamond-menu-indent"></div>
        <div className="diamond-menu">
            <div className="item item1">
            </div>
            <div className="item item2">
            </div>
            <div className="item item3">
            </div>
            <div className="item item4">
            </div>
        </div>
        <div className="diamond-menu-bar">XYZ</div>
    </div>);
    }
}

export{DiamondMenu}
