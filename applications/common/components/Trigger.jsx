import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';


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
  disabled: PropTypes.bool,
  delay: PropTypes.number,
  topOffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bottomOffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onToggleAnimation: PropTypes.func,
  debug: PropTypes.bool,
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
