import React from 'react';
import PropTypes from 'prop-types';

import { noOp } from '../util.js';


class Audio extends React.Component {
  audio = null;

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

  componentDidMount() {
    this.audio.addEventListener('ended', this.props.onFinish);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.play) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.props.onFinish);
  }

  render() {
    const { src, loop } = this.props;

    /* eslint-disable jsx-a11y/media-has-caption */
    return (
      <audio
        ref={(c) => { this.audio = c; }}
        src={src}
        loop={loop}
      />
    );
    /* eslint-enable */
  }
}


export default Audio;
