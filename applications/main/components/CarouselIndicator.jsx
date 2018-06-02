import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../../common/util.js';

import cssCarousel from '../stylesheets/Carousel.scss';


const CarouselIndicator = ({
  index,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? cssCarousel.active : '';

  return (
    <li
      styleName="cssCarousel.UTIL__carousel-indicator"
      className={activeClassName}
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
  onClick: noOp,
};


export default CarouselIndicator;
