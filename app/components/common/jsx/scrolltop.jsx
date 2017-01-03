import React from 'react';


const ScrollTop = ({top, bottom}) => (
  <a href="#HOME__section" className="scrollTop"
    style={{opacity: top || bottom ? 0 : 1, visibility: top || bottom ? "hidden" : "visible"}} >
    <i className="fa fa-arrow-up fa-fw fa-lg"></i>
  </a>
);


export default ScrollTop;
