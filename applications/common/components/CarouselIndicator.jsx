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
  current: React.PropTypes.number.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
};


export default CarouselIndicator;
