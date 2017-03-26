import React from 'react';


class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.shouldAnimate,
      currentValue: props.beginValue,
    };
    this.onCountUp = this.onCountUp.bind(this);
  }

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

  onCountUp() {
    const { beginValue, endValue, duration, interval } = this.props;
    const steps = Math.ceil(duration / interval);
    const increment = (endValue - beginValue) / steps;

    let currentValue = beginValue;
    let currentStep = 0;
    const handle = setInterval(() => {
      currentValue += increment;
      currentStep += 1;
      this.setState({ currentValue: parseInt(currentValue, 10) });

      if (currentStep >= steps) {
        clearInterval(handle);
        this.setState({ isActive: false });
      }
    }, interval);
  }

  render() {
    const { className, endValue } = this.props;
    const { isActive, currentValue } = this.state;
    const displayValue = isActive ? currentValue : endValue;
    const doneClassName = isActive ? '' : 'done';

    return (
      <span className={`${className} ${doneClassName}`}>
        {displayValue}
      </span>
    );
  }
}

Counter.propTypes = {
  className: React.PropTypes.string,
  beginValue: React.PropTypes.number,
  endValue: React.PropTypes.number,
  duration: React.PropTypes.number,
  interval: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
};
Counter.defaultProps = {
  className: '',
  beginValue: 0,
  endValue: NaN,
  duration: 2000,
  interval: 125,
  shouldAnimate: false,
};


export default Counter;
