import React from 'react';
import PropTypes from 'prop-types';

import { SvgLogoAlt } from './Images.js';

import { TARGET_BLANK } from '../constants/util.js';

// import '../stylesheets/Logo.scss';


const LogoAlt = ({
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
      <SvgLogoAlt />
    </a>
  );
};

LogoAlt.propTypes = {
  href: PropTypes.string,
  isTargetBlank: PropTypes.bool,
  className: PropTypes.string,
};
LogoAlt.defaultProps = {
  href: '/',
  isTargetBlank: true,
  className: '',
};


export default LogoAlt;
