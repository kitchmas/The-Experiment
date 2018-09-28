import React from 'react';


class DiamondPallete extends React.Component {
    palletClicked = () =>{
        this.props.onClick(this.props.id)
    }
    render() {
        return (
            <div className='diamond-holder diamond-holder-pallete' onClick={this.palletClicked}>
                <div className={this.props.pattern[0] !=0 ?"diamond " + this.props.pattern[0] :"diamond"} >
                </div>
                <div className={this.props.pattern[1] !=0 ?"diamond " + this.props.pattern[1] :"diamond"} >
                </div>
                <div className={this.props.pattern[2] !=0 ?"diamond " + this.props.pattern[2] :"diamond"} >
                </div>
                <div className={this.props.pattern[3] !=0 ?"diamond " + this.props.pattern[3]:"diamond"} >
                </div>
            </div>
        );
    }
}

export { DiamondPallete }






