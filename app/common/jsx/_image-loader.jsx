import React from 'react';


class ImageLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { tinySrc, fullSrc, extraClassName = '' } = this.props;
    const { isLoaded } = this.state;
    const isFilter = isLoaded ? 'none' : 'blur(20px)';
    const bgImage = isLoaded ? fullSrc : tinySrc;

    const divStyle = {
      backgroundImage: `url(${bgImage})`,
      filter: isFilter,
      '-webkit-filter': isFilter,
      '-moz-filter': isFilter,
      '-o-filter': isFilter,
      '-ms-filter': isFilter,
    };

    return (
      <div className={extraClassName} style={divStyle}>
        <img style={{ display: 'none' }} role="presentation"
          src={fullSrc}
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}
ImageLoader.propTypes = {
  tinySrc: React.PropTypes.string.isRequired,
  fullSrc: React.PropTypes.string.isRequired,
  extraClassName: React.PropTypes.string,
};


export default ImageLoader;
