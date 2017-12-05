import React from 'react';
import PropTypes from 'prop-types';

import { ABOUT } from '../constants/sectionTypes.js';


const ScrollDown = ({ onScrollTop }) => (
  <div className="HOME__scroll-down">
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
  onScrollTop: () => {},
};


export default ScrollDown;
