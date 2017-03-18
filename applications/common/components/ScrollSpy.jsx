import React from 'react';
import Waypoint from 'react-waypoint';


const ScrollSpy = ({
  section = '',
  onUpdateScroll = () => {},
  children = undefined,
}) => (
  <Waypoint onEnter={() => onUpdateScroll(section)}>
    {children}
  </Waypoint>
);

ScrollSpy.propTypes = {
  section: React.PropTypes.string,
  onUpdateScroll: React.PropTypes.func,
  children: React.PropTypes.node,
};


export default ScrollSpy;
