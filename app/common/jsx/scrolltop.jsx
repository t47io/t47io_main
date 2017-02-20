import React from 'react';


const ScrollTop = ({
  top,
  bottom,
}) => (
  <a href="#HOME__section" className="scrollTop"
    style={{
      opacity: top || bottom ? 0 : 1,
      visibility: (top || bottom) ? 'hidden' : 'visible',
    }}
  >
    <i className="fa fa-up-big fa-fwn fa-lg" />
  </a>
);
ScrollTop.propTypes = {
  top: React.PropTypes.bool.isRequired,
  bottom: React.PropTypes.bool.isRequired,
};


export default ScrollTop;
