import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoAlt from '../components/LogoAlt.jsx';
import Trigger from '../components/Trigger.jsx';
import WebAnimation from '../components/WebAnimation.jsx';

import * as footerActions from '../../common/actions/footerActions.js';
import {
  FOOTER_LEFT,
  FOOTER_RIGHT,
} from '../constants/sectionTypes.js';
import {
  footerHeader,
  footerGif,
} from '../animations/footer.js';

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
const year = new Date().getFullYear();


const Footer = ({
  animations: { footer },
  actions: { animateFooter },
}) => (
  <footer className="FOOTER text-off-white">
    <Trigger onToggleAnimation={animateFooter} />
    <WebAnimation
      className="FOOTTER__city hidden-sm hidden-xs"
      keyframes={footerGif.keyframes(FOOTER_LEFT)}
      timing={footerGif.timing}
      shouldAnimate={footer}
    >
      <a
        href="https://dribbble.com/shots/1772409-Golden-Gate-Bridge"
        target="_blank" rel="noopener noreferrer external"
      >
        <img
          className="FOOTER__city-gif"
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
    </WebAnimation>
    <WebAnimation
      className="container text-center FOOTER__header"
      keyframes={footerHeader.keyframes}
      timing={footerHeader.timing}
      shouldAnimate={footer}
    >
      <div className="FOOTER__copyright text-center">
        Copyright
        <i className="fa fa-fw fa-copyright" />
        <a className="FOOTER__year">2015 - {year}</a>
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
    </WebAnimation>
    <WebAnimation
      className="FOOTTER__city hidden-sm hidden-xs"
      keyframes={footerGif.keyframes(FOOTER_RIGHT)}
      timing={footerGif.timing}
      shouldAnimate={footer}
    >
      <a
        href="https://dribbble.com/shots/2037387-Seattle-FTW"
        target="_blank" rel="noopener noreferrer external"
      >
        <img
          className="FOOTER__city-gif"
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
    </WebAnimation>
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
Footer.defaultProps = {
  animations: {
    footer: false,
  },
  actions: {
    animateFooter: () => {},
  },
};


const mapStateToProps = state => (state.footer);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(footerActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
