import React from 'react';
import Waypoint from 'react-waypoint';


const Scrollspy = ({
  offset = 0,
  onToggleAnimation = () => {},
}) => (
  <Waypoint
    topOffset={`-${offset}`}
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
  offset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onToggleAnimation: React.PropTypes.func,
};


export default Scrollspy;
