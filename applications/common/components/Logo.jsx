import React from 'react';

import '../stylesheets/Logo.scss';

const logoSVG = require('../images/t47_logo.svg');
const logoAltSVG = require('../images/t47_logo_alt.svg');


const Logo = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoSVG }} />
);

const LogoAlt = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoAltSVG }} />
);


export {
  Logo,
  LogoAlt,
};
