import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../util.js';


class Audio extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    play: PropTypes.bool,
    loop: PropTypes.bool,
    onFinish: PropTypes.func,
  };

  static defaultProps = {
    play: false,
    loop: false,
    onFinish: noOp,
  };

  state = { audio: null };

  componentDidMount() {
    this.state.audio.addEventListener('ended', this.props.onFinish);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.play) {
      this.state.audio.play();
    } else {
      this.state.audio.pause();
    }
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  componentWillUnmount() {
    this.state.audio.removeEventListener('ended', this.props.onFinish);
  }

  render() {
    const { src, loop } = this.props;

    /* eslint-disable jsx-a11y/media-has-caption */
    return (
      <audio
        ref={(c) => { this.setState({ audio: c }); }}
        src={src}
        loop={loop}
      />
    );
  }
}


export default Audio;
