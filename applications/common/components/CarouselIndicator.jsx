import React from 'react';


const CarouselIndicator = ({
  index = NaN,
  isActive = false,
  onClick = () => {},
}) => (
  <li
    className={isActive ? 'active' : ''}
    onClick={() => onClick(index)}
  />
);

CarouselIndicator.propTypes = {
  index: React.PropTypes.number,
  isActive: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};


export default CarouselIndicator;
