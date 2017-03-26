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
    onEnter={({ currentPosition }) => {
      // console.error('onEnter', section, currentPosition);
      if (currentPosition === Waypoint.inside) {
        onUpdateScroll(section);
      }
    }}
    onLeave={({ currentPosition }) => {
      // console.error('onLeave', section, currentPosition);
      if (currentPosition === Waypoint.below) {
        onUpdateScroll(section - 1);
      } else if (currentPosition === Waypoint.above) {
        onUpdateScroll(section + 1);
      }
    }}
    onPositionChange={({ currentPosition }) => {
      // console.error('onChange', section, currentPosition);
      if (currentPosition === Waypoint.inside) {
        onUpdateScroll(section);
      }
    }}
    scrollableAncestor={window}
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
  bottomOffset: 0,
  onUpdateScroll: () => {},
  debug: false,
  className: '',
};


export default ScrollSpy;
