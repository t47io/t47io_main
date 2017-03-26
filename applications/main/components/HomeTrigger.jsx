import React from 'react';
import Waypoint from 'react-waypoint';


class HomeTrigger extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isTriggered: false };
  }

  render() {
    if (this.props.disabled || this.state.isTriggered) { return null; }

    const {
      onToggleAnimation,
      debug,
    } = this.props;

    return (
      <Waypoint
        onEnter={() => {
          onToggleAnimation();
          console.error('home trigger');
          this.setState({ isTriggered: true });
        }}
        debug={debug}
      />
    );
  }
}

HomeTrigger.propTypes = {
  disabled: React.PropTypes.bool,
  onToggleAnimation: React.PropTypes.func,
  debug: React.PropTypes.bool,
};
HomeTrigger.defaultProps = {
  disabled: false,
  onToggleAnimation: () => {},
  debug: false,
};


export default HomeTrigger;
