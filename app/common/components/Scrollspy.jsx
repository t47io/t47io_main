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
      this.props.onChangeAnimation(true);
    }
  }
  onLeave({ previousPosition, currentPosition }) {
    if (previousPosition === Waypoint.inside && currentPosition === Waypoint.below) {
      this.props.onChangeAnimation(false);
    }
  }

  render() {
    console.log(this.props.children);
    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
      >
        {this.props.children}
      </Waypoint>
    );
  }
}

Scrollspy.propTypes = {
  onChangeAnimation: React.PropTypes.func.isRequired,
};


export default Scrollspy;
