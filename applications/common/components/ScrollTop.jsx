import React from 'react';

import '../stylesheets/ScrollTop.scss';


const ScrollTop = ({ isHidden }) => {
  const opacity = isHidden ? 0 : 1;
  const visibility = isHidden ? 'hidden' : 'visible';

  return (
    <a href="#HOME__section" className="scrollTop" style={{ opacity, visibility }}>
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
