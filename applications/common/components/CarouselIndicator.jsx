import React from 'react';


const CarouselIndicator = ({
  current,
  onClick,
  index,
}) => (
  <li
    className={current === index ? 'active' : ''}
    data-slide={index}
    onClick={onClick}
  />
);

CarouselIndicator.propTypes = {
  current: React.PropTypes.number,
  index: React.PropTypes.number,
  onClick: React.PropTypes.func,
};


export default CarouselIndicator;
