import React from 'react';
import PropTypes from 'prop-types';


class Counter extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    doneClassName: PropTypes.string,
    beginValue: PropTypes.number,
    endValue: PropTypes.number,
    duration: PropTypes.number,
    interval: PropTypes.number,
    shouldAnimate: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    doneClassName: '',
    beginValue: 0,
    endValue: NaN,
    duration: 2000,
    interval: 125,
    shouldAnimate: false,
  };

  state = {
    isActive: this.props.shouldAnimate,
    currentValue: this.props.beginValue,
  };

  componentDidMount() {
    if (this.state.isActive) { this.onCountUp(); }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.shouldAnimate && !this.props.shouldAnimate) ||
      nextProps.endValue !== this.props.endValue) {
      this.setState({ isActive: nextProps.shouldAnimate });
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.shouldAnimate && !prevProps.shouldAnimate) ||
      this.props.endValue !== prevProps.endValue) {
      this.onCountUp();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onCountUp = () => {
    // eslint-disable-next-line object-curly-newline
    const { beginValue, endValue, duration, interval } = this.props;
    const steps = Math.ceil(duration / interval);
    const increment = (endValue - beginValue) / steps;

    let currentValue = beginValue;
    let currentStep = 0;
    this.timer = setInterval(() => {
      currentValue += increment;
      currentStep += 1;
      this.setState({ currentValue: parseInt(currentValue, 10) });

      if (currentStep >= steps) {
        clearInterval(this.timer);
        this.setState({ isActive: false });
      }
    }, interval);
  };

  render() {
    const { className, doneClassName, endValue } = this.props;
    const { isActive, currentValue } = this.state;
    const displayValue = isActive ? currentValue : endValue;
    const statusClassName = isActive ? '' : doneClassName;

    return (
      <span className={`${className} ${statusClassName}`}>
        {displayValue}
      </span>
    );
  }
}


export default Counter;
