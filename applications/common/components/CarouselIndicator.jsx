import React from 'react';


const CarouselIndicator = ({
  index,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? 'active' : '';

  return (
    <li
      className={`COMMON__carousel-indicator ${activeClassName}`}
      onClick={() => onClick(index)}
      role="presentation"
    />
  );
};

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
