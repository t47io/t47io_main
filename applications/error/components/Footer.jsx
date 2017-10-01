import React from 'react';
import PropTypes from 'prop-types';

import LogoAlt from '../../common/components/LogoAlt.jsx';

import { LICENSE } from '../../config.js';


const year = new Date().getFullYear();

const Footer = ({
  copy,
  cc,
}) => (
  <footer className="FOOTER">
    <p className="FOOTER__line">
      Copyright
      <i className="fa fa-fw" dangerouslySetInnerHTML={{ __html: copy }} />
      <a className="FOOTER__year">2015 - {year}</a>
      Designed, built & managed by
      <LogoAlt
        isTargetBlank={false}
        className="filled-white"
      />
      . All rights reserverd.
    </p>
    <p className="FOOTER__line">
      Code and content on this site is licensed under
      <a
        href={LICENSE}
        target="_blank" rel="noopener noreferrer external"
      >
        <i className="fa fa-fw" dangerouslySetInnerHTML={{ __html: cc }} />
        BY-NC-SA 4.0
      </a>
      .
    </p>
  </footer>
);

Footer.propTypes = {
  copy: PropTypes.string,
  cc: PropTypes.string,
};
Footer.defaultProps = {
  copy: '',
  cc: '',
};


export default Footer;
