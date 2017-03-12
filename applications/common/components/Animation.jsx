import React from 'react';


class Animation extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.shouldForceUpdate || nextProps.shouldForceUpdate ||
      nextProps.shouldAnimate !== this.props.shouldAnimate);
  }

  render() {
    const {
      tagName = 'div',
      className = '',
      beginClassName = 'ANIMATION__begin',
      endClassName = 'ANIMATION__end',
      shouldAnimate = true,
    } = this.props;
    const targetClassName = shouldAnimate ? endClassName : beginClassName;
    const CustomTag = `${tagName}`;

    return (
      <CustomTag className={`${className} ${targetClassName}`}>
        {this.props.children}
      </CustomTag>
    );
  }
}

Animation.propTypes = {
  tagName: React.PropTypes.string,
  className: React.PropTypes.string,
  beginClassName: React.PropTypes.string,
  endClassName: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  shouldForceUpdate: React.PropTypes.bool,
};


export default Animation;
