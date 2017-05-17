import React from 'react';

import '../stylesheets/Tooltip.scss';


const Tooltip = ({
  text,
  position,
  tagName,
  className,
  children,
  ...props
}) => {
  const CustomTag = `${tagName}`;
  const tooltip = !text ? {} : {
    'data-balloon': text,
    'data-balloon-pos': position,
  };

  return (
    <CustomTag
      className={className}
      {...tooltip}
      {...props}
    >
      {children}
    </CustomTag>
  );
};

Tooltip.propTypes = {
  text: React.PropTypes.string,
  position: React.PropTypes.oneOf(['top', 'bottom']),
  tagName: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};
Tooltip.defaultProps = {
  text: '',
  tagName: 'div',
  className: '',
  position: 'top',
};


export default Tooltip;
