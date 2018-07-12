import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';

import { noOp } from '../../common/util.js';


class HomeTrigger extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    onToggleAnimation: PropTypes.func,
    debug: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    onToggleAnimation: noOp,
    debug: false,
  };

  state = { isTriggered: false };

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


export default HomeTrigger;
