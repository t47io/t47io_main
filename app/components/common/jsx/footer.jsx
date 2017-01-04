import React from 'react';
import {SparkScroll, SparkProxy} from '../js/factory.js';

import {footer as tween} from '../js/tweens.js';


const year = (new Date()).getFullYear();

const Footer = () => (
  <footer class="text-off-white">
    <SparkProxy.div class="footer" proxyId="FOOTER__header">
      <SparkScroll.div class="mini-city hidden-sm hidden-xs"
        proxy="FOOTER__header"
        timeline={tween.gif} >
        <a href="https://dribbble.com/shots/1772409-Golden-Gate-Bridge" target="_blank" rel="noopener noreferrer external">
          <img alt="Minimal City SFO" width="128" height="96"
            src={require('../img/fg_city_sfo.gif')} />
        </a>
      </SparkScroll.div>
      <SparkScroll.div class="container text-center FOOTER__header"
        proxy="FOOTER__header"
        timeline={tween.header} >
        <div class="copyright text-center">
          Copyright <i class="fa fa-fw fa-copyright"></i> <a>2015 - {year}</a>
          &nbsp;Designed, built &amp; managed by&nbsp;
          <a href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">
            <div class="sprite" style="height:14px; width:44px;"><i class="logo_alt_w"></i></div>
          </a>.
          All rights reserverd.
        </div>
        <p class="copyright" style="padding-top:10px;">
          <a href="https://github.com/t47io/t47io_main/" target="_blank" rel="noopener noreferrer external" class="text-gray">
            Code and content <i class="fa fa-fw fa-sm fa-external-link"></i>
          </a>
          &nbsp;on this site is licensed under&nbsp;
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer external">
            <i class="fa fa-fw fa-lg fa-creative-commons"></i> BY-NC-SA 4.0 <i class="fa fa-fw fa-sm fa-external-link"></i>
          </a>.
        </p>
      </SparkScroll.div>
      <SparkScroll.div class="mini-city hidden-sm hidden-xs"
        proxy="FOOTER__header"
        timeline={tween.gif} >
        <a href="https://dribbble.com/shots/2037387-Seattle-FTW" target="_blank" rel="noopener noreferrer external">
          <img alt="Minimal City SEA" width="128" height="96"
            src={require('../img/fg_city_sea.gif')} />
        </a>
      </SparkScroll.div>
    </SparkProxy.div>
  </footer>
);


export default Footer;
