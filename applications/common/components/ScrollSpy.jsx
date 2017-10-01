import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';


const ScrollSpy = ({
  section,
  topOffset,
  bottomOffset,
  onUpdateScroll,
  debug,
  className,
  children,
}) => (
  <Waypoint
    topOffset={topOffset}
    bottomOffset={bottomOffset}
    onPositionChange={({ currentPosition }) => {
      // console.error('body onChange', section, currentPosition, previousPosition);
      // if (isUndefined(previousPosition)) { return; }
      if (currentPosition === Waypoint.inside) { onUpdateScroll(section); }
    }}
    scrollableAncestor={window}
    fireOnRapidScroll={false}
    debug={debug}
  >
    <div className={className}>
      {children}
    </div>
  </Waypoint>
);

ScrollSpy.propTypes = {
  section: PropTypes.number,
  topOffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bottomOffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onUpdateScroll: PropTypes.func,
  debug: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
ScrollSpy.defaultProps = {
  section: NaN,
  topOffset: 0,
  bottomOffset: window.innerHeight - 108,
  onUpdateScroll: () => {},
  debug: false,
  className: '',
};


export default ScrollSpy;
