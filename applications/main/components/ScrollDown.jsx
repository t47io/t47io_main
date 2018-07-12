import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../../common/util.js';
import { ABOUT } from '../constants/sectionTypes.js';

import '../stylesheets/HomeSection.scss';


const ScrollDown = ({ onScrollTop }) => (
  <div styleName="HOME__scroll-down">
    <a
      onClick={() => onScrollTop(ABOUT)}
      role="presentation"
    >
      <i className="fa fa-3x fa-fw fa-down-circled" />
    </a>
  </div>
);

ScrollDown.propTypes = {
  onScrollTop: PropTypes.func,
};
ScrollDown.defaultProps = {
  onScrollTop: noOp,
};


export default ScrollDown;
