import React from 'react';

import '../stylesheets/ScrollTop.scss';


const ScrollTop = ({ isHidden }) => {
  const hiddenClassName = isHidden ? 'invisible' : '';

  return (
    <a href="#HOME__section" className={`scrollTop ${hiddenClassName}`}>
      <i className="fa fa-up-big fa-fwn fa-lg" />
    </a>
  );
};

ScrollTop.propTypes = {
  isHidden: React.PropTypes.bool,
};
ScrollTop.defaultProps = {
  isHidden: false,
};


export default ScrollTop;
