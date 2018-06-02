import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../../common/util.js';

import cssFeat from '../stylesheets/FeatureSection.scss';


const CarouselIndicator = ({
  index,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? cssFeat.active : '';

  return (
    <li
      styleName="cssFeat.PROJECT__carousel-indicator"
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
