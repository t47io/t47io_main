import React from 'react';


class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoaded: false};
  }

  onLoad() {
    this.setState({isLoaded: true});
  }

  render() {
    const {tinySrc, fullSrc, extraClassName = ""} = this.props;
    const {isLoaded} = this.state;
    const isFilter = isLoaded ? "none": "blur(20px)";
    const bgImage = isLoaded ? fullSrc : tinySrc;

    const divStyle = {
      backgroundImage: `url(${bgImage})`,
      filter: isFilter,
      '-webkit-filter': isFilter,
      '-moz-filter': isFilter,
      '-o-filter': isFilter,
      '-ms-filter': isFilter
    };

    return (
      <div className={extraClassName} style={divStyle} >
        <img style="display:none" src={tinySrc}
          onLoad={this.onLoad.bind(this)} />
      </div>
    );
  }
}


export default ImageLoader;
