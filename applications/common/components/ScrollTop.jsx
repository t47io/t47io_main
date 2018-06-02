import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../util.js';
import { HOME } from '../../main/constants/sectionTypes.js';

import cssTop from '../stylesheets/ScrollTop.scss';


const ScrollTop = ({
  isHidden,
  onScrollTop,
}) => {
  const hiddenClassName = isHidden ? cssTop.invisible : '';

  return (
    <a
      styleName="cssTop.scrollTop"
      className={hiddenClassName}
      onClick={() => onScrollTop(HOME)}
      role="presentation"
    >
      <i className="fa fa-up-big fa-fwn fa-lg" />
    </a>
  );
};

ScrollTop.propTypes = {
  isHidden: PropTypes.bool,
  onScrollTop: PropTypes.func,
};
ScrollTop.defaultProps = {
  isHidden: false,
  onScrollTop: noOp,
};


export default ScrollTop;
