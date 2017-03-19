import React from 'react';


class Animation extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const shouldAnimate = (nextProps.shouldAnimate !== this.props.shouldAnimate);
    const shouldForceUpdate = this.props.shouldForceUpdate || nextProps.shouldForceUpdate;
    const propsForceUpdate = (nextProps.propsForceUpdate !== this.props.propsForceUpdate);

    return (shouldAnimate || shouldForceUpdate || propsForceUpdate);
  }

  render() {
    const {
      tagName,
      className,
      beginClassName,
      endClassName,
      shouldAnimate,
      children,
    } = this.props;
    const targetClassName = shouldAnimate ? endClassName : beginClassName;
    const CustomTag = `${tagName}`;

    return (
      <CustomTag className={`${className} ${targetClassName}`}>
        {children}
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
  propsForceUpdate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
    React.PropTypes.number,
  ]),
  children: React.PropTypes.node,
};
Animation.defaultProps = {
  tagName: 'div',
  className: '',
  beginClassName: 'ANIMATION__begin',
  endClassName: 'ANIMATION__end',
  shouldAnimate: true,
  shouldForceUpdate: false,
  propsForceUpdate: '',
  children: undefined,
};


export default Animation;
