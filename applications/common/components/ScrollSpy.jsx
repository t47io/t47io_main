import React from 'react';
import Waypoint from 'react-waypoint';


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
  section: React.PropTypes.number,
  topOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  bottomOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onUpdateScroll: React.PropTypes.func,
  debug: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
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
