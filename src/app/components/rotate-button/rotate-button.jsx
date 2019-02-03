import React from 'react';

import '../../../content/css/rotate-button.css';

const RotateButton = (props) => {
    return(
        <div onClick={() => props.rotate()} className="rotate-wrapper">
        <i className="fas fa-sync-alt"></i>
       </div>
    )
}

export default RotateButton
