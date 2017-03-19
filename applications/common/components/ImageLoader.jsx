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
    const { tinySrc, fullSrc, altText, extraClassName } = this.props;
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
        <img
          style={{ display: 'none' }}
          src={fullSrc}
          alt={altText}
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}

ImageLoader.propTypes = {
  tinySrc: React.PropTypes.string,
  fullSrc: React.PropTypes.string,
  altText: React.PropTypes.string,
  extraClassName: React.PropTypes.string,
};
ImageLoader.defaultProps = {
  tinySrc: '',
  fullSrc: '',
  altText: '',
  extraClassName: '',
};


export default ImageLoader;
