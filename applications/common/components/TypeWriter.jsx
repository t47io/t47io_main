import React from 'react';
import PropTypes from 'prop-types';

import { formatHomeText } from '../../main/util.js';


class TypeWriter extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    fullText: PropTypes.string,
    cursorCharacter: PropTypes.string,
    cursorClassName: PropTypes.string,
    cursorBlinkClassName: PropTypes.string,
    cursorHiddenClassName: PropTypes.string,
    interval: PropTypes.number,
    delay: PropTypes.number,
    shouldAnimate: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    fullText: '',
    cursorCharacter: '|',
    cursorClassName: '',
    cursorBlinkClassName: '',
    cursorHiddenClassName: '',
    interval: 125,
    delay: 0,
    shouldAnimate: false,
  };

  state = {
    isActive: this.props.shouldAnimate,
    hasStarted: false,
    currentText: '',
  };

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

  onTypeWrite = () => {
    const { fullText, interval, delay } = this.props;
    const steps = fullText.length;

    setTimeout(() => {
      this.setState({ hasStarted: true });

      let currentStep = 0;
      let currentText = '';
      this.timer = setInterval(() => {
        currentText = formatHomeText(fullText.slice(0, currentStep));
        currentStep += 1;
        this.setState({ currentText });

        if (currentStep > steps) {
          clearInterval(this.timer);
          this.setState({ isActive: false });
        }
      }, interval);
    }, delay);
  };

  render() {
    const {
      className,
      cursorCharacter,
      cursorClassName,
      cursorBlinkClassName,
      cursorHiddenClassName,
    } = this.props;
    const { isActive, hasStarted, currentText } = this.state;
    const cursor = isActive ? cursorCharacter : '';
    let cursorStatusClassName;
    if (hasStarted) {
      cursorStatusClassName = isActive ? cursorBlinkClassName : '';
    } else {
      cursorStatusClassName = cursorHiddenClassName;
    }

    return (
      <p className={className}>
        <span dangerouslySetInnerHTML={{ __html: currentText }} />
        <b className={`${cursorClassName} ${cursorStatusClassName}`}>
          {cursor}
        </b>
      </p>
    );
  }
}


export default TypeWriter;
