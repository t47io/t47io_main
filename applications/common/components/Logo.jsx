import React from 'react';
import PropTypes from 'prop-types';

import { SvgLogo } from './Images.js';

import { TARGET_BLANK } from '../constants/util.js';

// import '../stylesheets/Logo.scss';


const Logo = ({
  href,
  isTargetBlank,
  className,
}) => {
  const target = isTargetBlank ? TARGET_BLANK : {};

  return (
    <a
      {...target}
      href={href}
      className={className}
    >
      <SvgLogo />
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
