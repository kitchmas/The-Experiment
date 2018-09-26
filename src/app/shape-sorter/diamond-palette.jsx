import React from 'react';


class DiamondPallete extends React.Component {
    render() {
        return (
            <div className='diamond-holder diamond-holder-pallete'>
                <div className={this.props.pattern[0] === 1 ?"diamond diamond-red" :"diamond"} >
                </div>
                <div className={this.props.pattern[1] === 1 ?"diamond diamond-blue" :"diamond"} >
                </div>
                <div className={this.props.pattern[2] === 1 ? "diamond diamond-green" :"diamond"} >
                </div>
                <div className={this.props.pattern[3] === 1 ? "diamond diamond-black" :"diamond"} >
                </div>
            </div>
        );
    }
}

export { DiamondPallete }






