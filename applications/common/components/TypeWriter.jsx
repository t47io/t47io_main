import React from 'react';
import PropTypes from 'prop-types';


class TypeWriter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.shouldAnimate,
      hasStarted: false,
      currentText: '',
    };

    this.onTypeWrite = this.onTypeWrite.bind(this);
  }

  componentDidMount() {
    if (this.state.isActive) { this.onTypeWrite(); }
  }
  componentWillReceiveProps(nextProps) {
    if ((nextProps.shouldAnimate && !this.props.shouldAnimate) ||
      nextProps.fullText !== this.props.fullText) {
      this.setState({ isActive: nextProps.shouldAnimate });
    }
  }
  componentDidUpdate(prevProps) {
    if ((this.props.shouldAnimate && !prevProps.shouldAnimate) ||
      this.props.fullText !== prevProps.fullText) {
      this.onTypeWrite();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onTypeWrite() {
    const { fullText, interval, delay } = this.props;
    const steps = fullText.length;

    setTimeout(() => {
      this.setState({ hasStarted: true });

      let currentStep = 0;
      let currentText = '';
      this.timer = setInterval(() => {
        currentText = fullText.slice(0, currentStep)
          .replace(/!/g, '').replace(/@/g, '<br/>');
        currentStep += 1;
        this.setState({ currentText });

        if (currentStep > steps) {
          clearInterval(this.timer);
          this.setState({ isActive: false });
        }
      }, interval);
    }, delay);
  }

  render() {
    const { className, cursorCharacter, cursorClassName } = this.props;
    const { isActive, hasStarted, currentText } = this.state;
    const cursor = isActive ? cursorCharacter : '';
    let cursorBlinkClassName;
    if (hasStarted) {
      cursorBlinkClassName = isActive ? 'blink' : '';
    } else {
      cursorBlinkClassName = 'hidden';
    }

    return (
      <p className={className}>
        <span dangerouslySetInnerHTML={{ __html: currentText }} />
        <b className={`${cursorClassName} ${cursorBlinkClassName}`}>
          {cursor}
        </b>
      </p>
    );
  }
}

TypeWriter.propTypes = {
  className: PropTypes.string,
  fullText: PropTypes.string,
  cursorCharacter: PropTypes.string,
  cursorClassName: PropTypes.string,
  interval: PropTypes.number,
  delay: PropTypes.number,
  shouldAnimate: PropTypes.bool,
};
TypeWriter.defaultProps = {
  className: '',
  fullText: '',
  cursorCharacter: '|',
  cursorClassName: 'blink',
  interval: 125,
  delay: 0,
  shouldAnimate: false,
};


export default TypeWriter;
