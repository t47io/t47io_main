import React from 'react';
import Waypoint from 'react-waypoint';


const Scrollspy = ({ onToggleAnimation }) => (
  <Waypoint
    onEnter={({ previousPosition, currentPosition }) => {
      if (previousPosition === Waypoint.below &&
        currentPosition === Waypoint.inside) {
        onToggleAnimation(true);
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
  onToggleAnimation: React.PropTypes.func,
};
Scrollspy.defaultProps = {
  onToggleAnimation: () => {},
};


export default Scrollspy;
