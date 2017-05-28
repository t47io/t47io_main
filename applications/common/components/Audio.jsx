import React from 'react';


class Audio extends React.PureComponent {
  constructor(props) {
    super(props);
    this.audio = null;
  }

  componentDidMount() {
    this.audio.addEventListener('ended', this.props.onFinish);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.play) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.props.onFinish);
  }

  render() {
    const { src, loop } = this.props;

    return (
      <audio
        ref={(c) => { this.audio = c; }}
        src={src}
        loop={loop}
      />
    );
  }
}

Audio.propTypes = {
  src: React.PropTypes.string.isRequired,
  play: React.PropTypes.bool,
  loop: React.PropTypes.bool,
  onFinish: React.PropTypes.func,
};
Audio.defaultProps = {
  play: false,
  loop: false,
  onFinish: () => {},
};


export default Audio;
