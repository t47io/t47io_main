import React from 'react';
import Waypoint from 'react-waypoint';


const Trigger = ({
  disabled,
  delay,
  topOffset,
  bottomOffset,
  onToggleAnimation,
  debug,
}) => (
  <Waypoint
    topOffset={topOffset}
    bottomOffset={bottomOffset}
    onEnter={({ previousPosition, currentPosition }) => {
      if (!disabled &&
        previousPosition === Waypoint.below &&
        currentPosition === Waypoint.inside) {
        setTimeout(() => onToggleAnimation(true), delay);
      }
    }}
    onLeave={({ previousPosition, currentPosition }) => {
      if (!disabled &&
        previousPosition === Waypoint.inside &&
        currentPosition === Waypoint.below) {
        onToggleAnimation(false);
      }
    }}
    fireOnRapidScroll={false}
    debug={debug}
  />
);

Trigger.propTypes = {
  disabled: React.PropTypes.bool,
  delay: React.PropTypes.number,
  topOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  bottomOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onToggleAnimation: React.PropTypes.func,
  debug: React.PropTypes.bool,
};
Trigger.defaultProps = {
  disabled: false,
  delay: 250,
  topOffset: 0,
  bottomOffset: 0,
  onToggleAnimation: () => {},
  debug: false,
};


export default Trigger;
