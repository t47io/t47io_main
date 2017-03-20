import React from 'react';
import { Animation } from 'react-web-animation';


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
    const shouldForceUpdate = this.props.shouldForceUpdate || nextProps.shouldForceUpdate;
    const propsForceUpdate = (nextProps.propsForceUpdate !== this.props.propsForceUpdate);
    return (shouldAnimate || shouldForceUpdate || propsForceUpdate);
  }

  render() {
    const { tagName, className, keyframes, timing, style, onFinish, children } = this.props;
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
        <CustomTag className={className} style={style}>
          {children}
        </CustomTag>
      </Animation>
    );
  }
}

WebAnimation.propTypes = {
  tagName: React.PropTypes.string,
  className: React.PropTypes.string,
  keyframes: React.PropTypes.arrayOf(React.PropTypes.object),
  timing: React.PropTypes.object,
  shouldAnimate: React.PropTypes.bool,
  shouldForceUpdate: React.PropTypes.bool,
  propsForceUpdate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
    React.PropTypes.number,
  ]),
  style: React.PropTypes.object,
  onFinish: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};
WebAnimation.defaultProps = {
  tagName: 'div',
  className: '',
  keyframes: [],
  timing: {},
  shouldAnimate: false,
  shouldForceUpdate: false,
  propsForceUpdate: '',
  style: {},
  onFinish: undefined,
};


export default WebAnimation;
