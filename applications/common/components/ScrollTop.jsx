import React from 'react';

import '../stylesheets/ScrollTop.scss';


const ScrollTop = ({
  top,
  bottom,
}) => {
  const opacity = (top || bottom) ? 0 : 1;
  const visibility = (top || bottom) ? 'hidden' : 'visible';

  return (
    <a href="#HOME__section" className="scrollTop" style={{ opacity, visibility }}>
      <i className="fa fa-up-big fa-fwn fa-lg" />
    </a>
  );
};

ScrollTop.propTypes = {
  top: React.PropTypes.bool,
  bottom: React.PropTypes.bool,
};


export default ScrollTop;
