import React from 'react';

import LogoAlt from '../../common/components/LogoAlt.jsx';
import {
  SvgCopyRight,
  SvgCC,
} from './Images.js';

import { LICENSE } from '../../config.js';


const year = new Date().getFullYear();

const Footer = () => (
  <footer className="FOOTER">
    <p className="FOOTER__line">
      Copyright
      <i className="fa fa-fw">
        <SvgCopyRight />
      </i>
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
        <i className="fa fa-fw">
          <SvgCC />
        </i>
        BY-NC-SA 4.0
      </a>
      .
    </p>
  </footer>
);


export default Footer;
