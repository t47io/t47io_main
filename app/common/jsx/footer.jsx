import React from 'react';
import { LogoAlt } from './logo.jsx';
import {
  SparkScroll,
  SparkProxy,
} from '../js/factory.js';

import { footer as tween } from '../js/tweens.js';


const year = (new Date()).getFullYear();

const Footer = () => (
  <footer className="text-off-white">
    <SparkProxy.div className="FOOTER"
      proxyId="FOOTER__header"
    >
      <SparkScroll.div className="FOOTTER__city_gif hidden-sm hidden-xs"
        proxy="FOOTER__header"
        timeline={tween.gif}
      >
        <a href="https://dribbble.com/shots/1772409-Golden-Gate-Bridge" target="_blank" rel="noopener noreferrer external">
          <img alt="Minimal City SFO" width="128" height="96"
            src={require('../img/fg_city_sfo.gif')}
            srcSet={`${require('../img/fg_city_sfo.gif')} 1x, ${require('../img/fg_city_sfo@1.5x.gif')} 1.5x, ${require('../img/fg_city_sfo@2x.gif')} 2x, ${require('../img/fg_city_sfo@3x.gif')} 3x`}
          />
        </a>
      </SparkScroll.div>
      <SparkScroll.div className="container text-center FOOTER__header"
        proxy="FOOTER__header"
        timeline={tween.header}
      >
        <div className="FOOTER__copyright text-center">
          Copyright
          <i className="fa fa-fw fa-copyright" />
          <a>2015 - {year}</a>
          Designed, built &amp; managed by
          <LogoAlt href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" className="COMMON__footer_logo green-transparent" />
          . All rights reserverd.
        </div>
        <p className="FOOTER__copyright">
          <a href="https://github.com/t47io/t47io_main/" target="_blank" rel="noopener noreferrer external" className="text-gray">
            Code and content
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>
          on this site is licensed under
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer external">
            <i className="fa fa-fw fa-lg fa-creative-commons" />
            BY-NC-SA 4.0
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>.
        </p>
      </SparkScroll.div>
      <SparkScroll.div className="FOOTTER__city_gif hidden-sm hidden-xs"
        proxy="FOOTER__header"
        timeline={tween.gif}
      >
        <a href="https://dribbble.com/shots/2037387-Seattle-FTW" target="_blank" rel="noopener noreferrer external">
          <img alt="Minimal City SEA" width="128" height="96"
            src={require('../img/fg_city_sea.gif')}
            srcSet={`${require('../img/fg_city_sea.gif')} 1x, ${require('../img/fg_city_sea@1.5x.gif')} 1.5x, ${require('../img/fg_city_sea@2x.gif')} 2x, ${require('../img/fg_city_sea@3x.gif')} 3x`}
          />
        </a>
      </SparkScroll.div>
    </SparkProxy.div>
  </footer>
);
Footer.propTypes = {};


export default Footer;
