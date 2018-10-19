import React from 'react';
import DragScroll from 'react-dragscroll';

import '../../content/css/carousel.css';

const Carousel = ({items}) => {
    return (
        <div className="fade-wrapper">
            <div className="fade-left"></div>
            <DragScroll className="carousel" width={1500}>
                {items}
            </DragScroll>
            <div className="fade-right"></div>
        </div>
    )
}

export default Carousel

