import React from 'react';


class TypeWriter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.shouldAnimate,
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
    if ((!prevProps.shouldAnimate && this.props.shouldAnimate) ||
      prevProps.fullText !== this.props.fullText) {
      this.onTypeWrite();
    }
  }

  onTypeWrite() {
    const { fullText, interval, delay } = this.props;
    const steps = fullText.length;

    setTimeout(() => {
      let currentStep = 0;
      let currentText = '';
      const handle = setInterval(() => {
        currentText = fullText.slice(0, currentStep)
          .replace(/!/g, '').replace(/@/g, '<br/>');
        currentStep += 1;
        this.setState({ currentText });

        if (currentStep > steps) {
          clearInterval(handle);
          this.setState({ isActive: false });
        }
      }, interval);
    }, delay);
  }

  render() {
    const { className, cursorCharacter, cursorClassName } = this.props;
    const { isActive, currentText } = this.state;
    const cursor = isActive ? cursorCharacter : '';

    return (
      <p className={className}>
        <span dangerouslySetInnerHTML={{ __html: currentText }} />
        <b className={`${cursorClassName} blink`}>
          {cursor}
        </b>
      </p>
    );
  }
}

TypeWriter.propTypes = {
  className: React.PropTypes.string,
  fullText: React.PropTypes.string,
  cursorCharacter: React.PropTypes.string,
  cursorClassName: React.PropTypes.string,
  interval: React.PropTypes.number,
  delay: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
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
