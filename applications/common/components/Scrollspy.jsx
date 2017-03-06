import React from 'react';
import Waypoint from 'react-waypoint';


class Scrollspy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  onEnter({ previousPosition, currentPosition }) {
    if (previousPosition === Waypoint.below && currentPosition === Waypoint.inside) {
      this.props.onEnableAnimation();
    }
  }
  onLeave({ previousPosition, currentPosition }) {
    if (previousPosition === Waypoint.inside && currentPosition === Waypoint.below) {
      this.props.onDisableAnimation();
    }
  }

  render() {
    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
      />
    );
  }
}

Scrollspy.propTypes = {
  onEnableAnimation: React.PropTypes.func.isRequired,
  onDisableAnimation: React.PropTypes.func.isRequired,
};


export default Scrollspy;
