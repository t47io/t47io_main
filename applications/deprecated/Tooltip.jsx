import React from 'react';
import PropTypes from 'prop-types';


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
  text: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  tagName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
Tooltip.defaultProps = {
  text: '',
  tagName: 'div',
  className: '',
  position: 'top',
};


export default Tooltip;
