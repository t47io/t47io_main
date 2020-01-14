import React from 'react';
import { Animation } from 'react-web-animation';
import PropTypes from 'prop-types';

import { getPlayState } from '../util.js';


class WebAnimation extends React.Component {
  static propTypes = {
    tagName: PropTypes.string,
    keyframes: PropTypes.arrayOf(PropTypes.object),
    timing: PropTypes.object,
    shouldAnimate: PropTypes.bool,
    shouldReverse: PropTypes.bool,
    shouldForceUpdate: PropTypes.bool,
    propsForceUpdate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
    ]),
    onFinish: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  static defaultProps = {
    tagName: 'div',
    keyframes: [],
    timing: {},
    shouldAnimate: false,
    shouldReverse: false,
    shouldForceUpdate: false,
    propsForceUpdate: '',
    onFinish: undefined,
    children: null,
  };

  state = { playState: getPlayState(this.props.shouldAnimate) };

  componentWillReceiveProps(nextProps) {
    this.setState({ playState: getPlayState(nextProps.shouldAnimate) });
  }

  shouldComponentUpdate(nextProps) {
    const shouldAnimate = (nextProps.shouldAnimate !== this.props.shouldAnimate);
    const shouldReverse = (nextProps.shouldReverse !== this.props.shouldReverse);
    const shouldForceUpdate = this.props.shouldForceUpdate || nextProps.shouldForceUpdate;
    const propsForceUpdate = (nextProps.propsForceUpdate !== this.props.propsForceUpdate);
    return (shouldAnimate || shouldReverse || shouldForceUpdate || propsForceUpdate);
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { tagName, keyframes, timing, onFinish, children, ...props } = this.props;
    const { playState } = this.state;
    const CustomTag = `${tagName}`;

    return (
      <Animation
        keyframes={keyframes}
        timing={timing}
        playState={playState}
        onFinish={() => {
          this.setState({ playState: 'finished' });
          if (typeof onFinish === 'function') { onFinish(); }
        }}
      >
        <CustomTag {...props}>
          {children}
        </CustomTag>
      </Animation>
    );
  }
}


export default WebAnimation;
