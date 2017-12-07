import React from 'react';
import PropTypes from 'prop-types';


class ColorCycler extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    fullText: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
    interval: PropTypes.number,
    delay: PropTypes.number,
    isActive: PropTypes.bool,
  };
  static defaultProps = {
    className: '',
    fullText: '',
    choices: [],
    interval: 2000,
    delay: 0,
    isActive: false,
  };

  state = {
    isActive: this.props.isActive,
    index: 0,
  };

  componentDidMount() {
    if (this.state.isActive) { this.onColorCycle(); }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({ isActive: nextProps.isActive });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onColorCycle = () => {
    const { choices, interval, delay } = this.props;

    setTimeout(() => {
      this.timer = setInterval(() => {
        const { index } = this.state;
        const nextIndex = (index + 1) % choices.length;
        this.setState({ index: nextIndex });
      }, interval);
    }, delay);
  };

  render() {
    const { className, fullText, choices } = this.props;
    const { index } = this.state;
    const textColorClassName = `text-${choices[index]}`;

    return (
      <p className={`${className} ${textColorClassName}`}>
        <span dangerouslySetInnerHTML={{ __html: fullText }} />
      </p>
    );
  }
}


export default ColorCycler;
