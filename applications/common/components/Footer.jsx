import React from 'react';

import Animation from '../../common/components/Animation.jsx';
import Scrollspy from '../../common/components/Scrollspy.jsx';
import { LogoAlt } from './Logo.jsx';

import '../stylesheets/Footer.scss';

const imgSFO = {
  '1x': require('../images/fg_city_sfo.gif'),
  '1.5x': require('../images/fg_city_sfo@1.5x.gif'),
  '2x': require('../images/fg_city_sfo@2x.gif'),
  '3x': require('../images/fg_city_sfo@3x.gif'),
};
const imgSEA = {
  '1x': require('../images/fg_city_sea.gif'),
  '1.5x': require('../images/fg_city_sea@1.5x.gif'),
  '2x': require('../images/fg_city_sea@2x.gif'),
  '3x': require('../images/fg_city_sea@3x.gif'),
};
const year = (new Date()).getFullYear();


const Footer = ({
  animations: { footer = true },
  actions: { animateFooter = () => {} },
}) => (
  <footer className="FOOTER text-off-white">
    <Scrollspy
      delay={1000}
      onToggleAnimation={animateFooter}
    />
    <Animation
      className="FOOTTER__city_gif hidden-sm hidden-xs"
      shouldAnimate={footer}
    >
      <a
        href="https://dribbble.com/shots/1772409-Golden-Gate-Bridge"
        target="_blank" rel="noopener noreferrer external"
      >
        <img
          alt="Minimal City SFO"
          width="128" height="96"
          src={imgSFO['1x']}
          srcSet={`
            ${imgSFO['1x']} 1x,
            ${imgSFO['1.5x']} 1.5x,
            ${imgSFO['2x']} 2x,
            ${imgSFO['3x']} 3x
          `}
        />
      </a>
    </Animation>
    <Animation
      className="container text-center FOOTER__header"
      shouldAnimate={footer}
    >
      <div className="FOOTER__copyright text-center">
        Copyright
        <i className="fa fa-fw fa-copyright" />
        <a style={{ marginRight: '0.75em' }}>2015 - {year}</a>
        Designed, built & managed by
        <LogoAlt
          href="mailto:contact@t47.io"
          target="_blank" rel="noopener noreferrer external"
          className="COMMON__footer_logo green-transparent"
        />
        . All rights reserverd.
      </div>
      <p className="FOOTER__copyright">
        <a
          href="https://github.com/t47io/t47io_main/"
          target="_blank" rel="noopener noreferrer external"
          className="text-gray"
        >
          Code and content
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        on this site is licensed under
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-lg fa-creative-commons" />
          BY-NC-SA 4.0
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>.
      </p>
    </Animation>
    <Animation
      className="FOOTTER__city_gif hidden-sm hidden-xs"
      shouldAnimate={footer}
    >
      <a
        href="https://dribbble.com/shots/2037387-Seattle-FTW"
        target="_blank" rel="noopener noreferrer external"
      >
        <img
          alt="Minimal City SEA"
          width="128" height="96"
          src={imgSEA['1x']}
          srcSet={`
            ${imgSEA['1x']} 1x,
            ${imgSEA['1.5x']} 1.5x,
            ${imgSEA['2x']} 2x,
            ${imgSEA['3x']} 3x
          `}
        />
      </a>
    </Animation>
  </footer>
);

Footer.propTypes = {
  animations: React.PropTypes.shape({
    footer: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateFooter: React.PropTypes.func,
  }),
};


export default Footer;
