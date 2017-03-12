import React from 'react';
import Waypoint from 'react-waypoint';


const Scrollspy = ({
  delay = 250,
  onToggleAnimation = () => {},
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

Scrollspy.propTypes = {
  delay: React.PropTypes.number,
  onToggleAnimation: React.PropTypes.func,
};


export default Scrollspy;
