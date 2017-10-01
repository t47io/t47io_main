import React from 'react';
import PropTypes from 'prop-types';


const CarouselIndicator = ({
  index,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? 'active' : '';

  return (
    <li
      className={`PROJECT__carousel-indicator ${activeClassName}`}
      onClick={() => onClick(index)}
      role="presentation"
    />
  );
};

CarouselIndicator.propTypes = {
  index: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};
CarouselIndicator.defaultProps = {
  index: NaN,
  isActive: false,
  onClick: () => {},
};


export default CarouselIndicator;
