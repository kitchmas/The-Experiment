import React from 'react';

class NextCharacterScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="next-challenger-screen center-text">
                    <div className="monster-name ">
                        {this.props.name} want's some
                    </div>
                    
                        <i className={"monster " + this.props.className}></i>
            </div>
        );
    }
}

export default NextCharacterScreen