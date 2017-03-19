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
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};
ScrollSpy.defaultProps = {
  section: '',
  onUpdateScroll: () => {},
};


export default ScrollSpy;
