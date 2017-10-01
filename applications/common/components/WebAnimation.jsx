import React from 'react';
import { Animation } from 'react-web-animation';
import PropTypes from 'prop-types';


const getPlayState = shouldAnimate => (shouldAnimate ? 'running' : 'finished');


class WebAnimation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { playState: getPlayState(props.shouldAnimate) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ playState: getPlayState(nextProps.shouldAnimate) });
  }
  shouldComponentUpdate(nextProps, nextState) {
    const shouldAnimate = (nextProps.shouldAnimate !== this.props.shouldAnimate);
    const shouldReverse = (nextProps.shouldReverse !== this.props.shouldReverse);
    const shouldForceUpdate = this.props.shouldForceUpdate || nextProps.shouldForceUpdate;
    const propsForceUpdate = (nextProps.propsForceUpdate !== this.props.propsForceUpdate);
    return (shouldAnimate || shouldReverse || shouldForceUpdate || propsForceUpdate);
  }

  render() {
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

WebAnimation.propTypes = {
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
WebAnimation.defaultProps = {
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


export default WebAnimation;
