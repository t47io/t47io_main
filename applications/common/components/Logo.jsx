import React from 'react';
import PropTypes from 'prop-types';

import { SvgLogo } from './Images.js';

// import '../stylesheets/Logo.scss';


const targetBlank = {
  target: '_blank',
  rel: 'noopener noreferrer external',
};

const Logo = ({
  href,
  isTargetBlank,
  className,
}) => {
  const target = isTargetBlank ? targetBlank : {};

  return (
    <a
      {...target}
      href={href}
      className={className}
    >
      <img src={SvgLogo} />
    </a>
  );
};

Logo.propTypes = {
  href: PropTypes.string,
  isTargetBlank: PropTypes.bool,
  className: PropTypes.string,
};
Logo.defaultProps = {
  href: '/',
  isTargetBlank: true,
  className: '',
};


export default Logo;
