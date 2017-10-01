import React from 'react';
import PropTypes from 'prop-types';


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

// const Animation = ({
//   tagName,
//   className,
//   endClassName,
//   children,
// }) => {
//   const CustomTag = `${tagName}`;

//   return (
//     <CustomTag className={`${className} ${endClassName}`}>
//       {children}
//     </CustomTag>
//   );
// };


Animation.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  beginClassName: PropTypes.string,
  endClassName: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  shouldForceUpdate: PropTypes.bool,
  propsForceUpdate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
Animation.defaultProps = {
  tagName: 'div',
  className: '',
  beginClassName: 'ANIMATION__begin',
  endClassName: 'ANIMATION__end',
  shouldAnimate: true,
  shouldForceUpdate: false,
  propsForceUpdate: '',
};


export default Animation;
