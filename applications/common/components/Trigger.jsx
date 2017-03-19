import React from 'react';
import Waypoint from 'react-waypoint';


const Trigger = ({
  delay,
  onToggleAnimation,
}) => (
  <Waypoint
    onEnter={({ previousPosition, currentPosition }) => {
      if (previousPosition === Waypoint.below &&
        currentPosition === Waypoint.inside) {
        setTimeout(() => onToggleAnimation(true), delay);
      }
    }}
    onLeave={({ previousPosition, currentPosition }) => {
      if (previousPosition === Waypoint.inside &&
        currentPosition === Waypoint.below) {
        onToggleAnimation(false);
      }
    }}
  />
);

Trigger.propTypes = {
  delay: React.PropTypes.number,
  onToggleAnimation: React.PropTypes.func,
};
Trigger.defaultProps = {
  delay: 250,
  onToggleAnimation: () => {},
};


export default Trigger;
