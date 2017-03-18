import React from 'react';

import '../stylesheets/Logo.scss';

const logoSVG = require('../images/t47_logo.svg');


const Logo = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoSVG }} />
);


export default Logo;
