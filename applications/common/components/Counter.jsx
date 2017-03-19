import React from 'react';


class Counter extends React.PureComponent {

  render() {
    const { className, endValue } = this.props;
    return (
      <span className={className}>{endValue}</span>
    );
  }
}

Counter.propTypes = {
  className: React.PropTypes.string,
  beginValue: React.PropTypes.number,
  endValue: React.PropTypes.number,
  duration: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
};
Counter.defaultProps = {
  className: '',
  beginValue: 0,
  endValue: NaN,
  duration: 2000,
  shouldAnimate: true,
};


export default Counter;
