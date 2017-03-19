import React from 'react';
import Waypoint from 'react-waypoint';


const ScrollSpy = ({
  section,
  onUpdateScroll,
  children,
}) => (
  <Waypoint onEnter={() => onUpdateScroll(section)}>
    <div>
      {children}
    </div>
  </Waypoint>
);

ScrollSpy.propTypes = {
  section: React.PropTypes.string,
  onUpdateScroll: React.PropTypes.func,
  children: React.PropTypes.node,
};
ScrollSpy.defaultProps = {
  section: '',
  onUpdateScroll: () => {},
  children: undefined,
};


export default ScrollSpy;
