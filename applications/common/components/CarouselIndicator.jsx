import React from 'react';


const CarouselIndicator = ({
  index,
  isActive,
  onClick,
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
CarouselIndicator.defaultProps = {
  index: NaN,
  isActive: false,
  onClick: () => {},
};


export default CarouselIndicator;
