import React from 'react';


const Animation = ({
  className = '',
  beginClassName = 'ANIMATION__begin',
  endClassName = 'ANIMATION__end',
  shouldAnimate = true,
  children,
}) => {
  const targetClassName = shouldAnimate ? endClassName : beginClassName;

  return (
    <div className={`${className} ${targetClassName}`}>
      {children}
    </div>
  );
};

Animation.propTypes = {
  className: React.PropTypes.string,
  beginClassName: React.PropTypes.string,
  endClassName: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
};


export default Animation;
