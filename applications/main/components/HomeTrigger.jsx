import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';


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
          this.setState({ isTriggered: true });
        }}
        debug={debug}
      />
    );
  }
}

HomeTrigger.propTypes = {
  disabled: PropTypes.bool,
  onToggleAnimation: PropTypes.func,
  debug: PropTypes.bool,
};
HomeTrigger.defaultProps = {
  disabled: false,
  onToggleAnimation: () => {},
  debug: false,
};


export default HomeTrigger;
