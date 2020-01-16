import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LogoAlt from '../components/LogoAlt.jsx';
import Trigger from '../components/Trigger.jsx';
import WebAnimation from '../components/WebAnimation.jsx';

import * as footerActions from '../actions/footerActions.js';
import { initialState as footerProps } from '../reducers/footer.js';
import {
  FOOTER,
  FOOTER_LEFT,
  FOOTER_RIGHT,
} from '../constants/sectionTypes.js';
import {
  EMAIL,
  LICENSE,
  REPOSITORY,
} from '../../config.js';

import {
  imgSEA,
  imgSFO,
} from '../components/Images.js';
import {
  SVG_INDICES,
  URL_DRIBBLE_SEA,
  URL_DRIBBLE_SFO,
} from '../constants/util.js';
import {
  footerHeader,
  footerGif,
} from '../animations/footer.js';
import {
  noOp,
  year,
} from '../util.js';

import cssType from '../mixins/typography.scss';
import cssSvg from '../../main/stylesheets/svg.scss';
import cssFooter from '../stylesheets/Footer.scss';


const Footer = ({
  animations: { footer },
  actions: { animateFooter },
  disabled,
}) => (
  <footer styleName="cssFooter.FOOTER cssType.text-off-white">
    <Trigger
      disabled={disabled}
      onToggleAnimation={animateFooter}
    />
    <WebAnimation
      styleName="cssFooter.FOOTTER__city cssSvg.SVG cssSvg.SVG--hover"
      className="hidden-sm hidden-xs"
      keyframes={footerGif.keyframes(FOOTER_LEFT)}
      timing={footerGif.timing}
      shouldAnimate={footer}
    >
      <a
        href={URL_DRIBBLE_SFO}
        target="_blank" rel="noopener noreferrer external"
      >
        {SVG_INDICES.map(i => (
          <img
            key={`FOOTTER__city-SFO--${i}`}
            styleName={`cssFooter.FOOTER__city-gif cssSvg.SVG--${i}`}
            src={imgSFO[i]}
            alt="Minimal City SFO"
          />
        ))}
      </a>
    </WebAnimation>
    <WebAnimation
      styleName="cssFooter.FOOTER__header"
      className="container text-center"
      keyframes={footerHeader.keyframes}
      timing={footerHeader.timing}
      shouldAnimate={footer}
    >
      <div styleName="cssFooter.FOOTER__copyright" className="text-center">
        Copyright
        <i className="fa fa-fw fa-copyright" />
        <a styleName="cssFooter.FOOTER__year">2015 - {year}</a>
        Designed, built & managed by
        <LogoAlt
          href={`mailto:${EMAIL}`}
          styleName="cssFooter.COMMON__footer_logo"
          className="filled-transparent"
        />
        . All rights reserverd.
      </div>
      <p styleName="cssFooter.FOOTER__copyright">
        <a
          href={REPOSITORY}
          target="_blank" rel="noopener noreferrer external"
          styleName="cssType.text-gray"
        >
          Code and content
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        on this site is licensed under
        <a
          href={LICENSE}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-creative-commons" />
          BY-NC-SA 4.0
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>.
      </p>
    </WebAnimation>
    <WebAnimation
      styleName="cssFooter.FOOTTER__city cssSvg.SVG cssSvg.SVG--hover"
      className="hidden-sm hidden-xs"
      keyframes={footerGif.keyframes(FOOTER_RIGHT)}
      timing={footerGif.timing}
      shouldAnimate={footer}
    >
      <a
        href={URL_DRIBBLE_SEA}
        target="_blank" rel="noopener noreferrer external"
      >
        {SVG_INDICES.map(i => (
          <img
            key={`FOOTTER__city-SEA--${i}`}
            styleName={`cssFooter.FOOTER__city-gif cssSvg.SVG--${i}`}
            src={imgSEA[i]}
            alt="Minimal City SEA"
          />
        ))}
      </a>
    </WebAnimation>
  </footer>
);

Footer.propTypes = {
  animations: PropTypes.shape({
    footer: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateFooter: PropTypes.func,
  }),
  disabled: PropTypes.bool,
};
Footer.defaultProps = {
  ...footerProps,
  actions: {
    animateFooter: noOp,
  },
  disabled: false,
};


const mapStateToProps = state => (state[FOOTER]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(footerActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
