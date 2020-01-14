import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import HomeDescription from '../components/HomeDescription.jsx';
import HomeName from '../components/HomeName.jsx';
import HomeTrigger from '../components/HomeTrigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import {
  SvgAvatar,
  imgAvatars,
} from '../components/Images.js';
import * as homeActions from '../actions/homeActions.js';
import { initialState as homeProps } from '../reducers/home.js';
import { homeShade } from '../animations/home.js';
import { noOp } from '../../common/util.js';
import { HOME } from '../constants/sectionTypes.js';
import { AVATAR_INDICES } from '../constants/util.js';

/* eslint-disable no-unused-vars */
import cssType from '../../common/mixins/typography.scss';
import cssSvg from '../stylesheets/svg.scss';
import cssUtil from '../stylesheets/util.scss';
import cssHome from '../stylesheets/HomeSection.scss';
import cssCarousel from '../stylesheets/Carousel.scss';
/* eslint-enable */


const HomeSection = ({
  data: {
    title,
    server,
  },
  animations: {
    ready,
    avatar,
    intro,
    color,
  },
  actions: { animateHome },
}) => {
  let svgClassName;
  if (intro) {
    svgClassName = cssHome.finished;
  } else {
    svgClassName = (ready && avatar) ? cssHome.active : '';
  }

  return (
    <section id="HOME__section" styleName="cssHome.HOME__section">
      <HomeTrigger
        disabled={!ready}
        onToggleAnimation={animateHome}
      />
      <h1 styleName="cssHome.HOME__name--seo">SIQI TIAN</h1>
      <div styleName="cssSvg.SVG cssHome.SVG--home cssCarousel.SVG__background" className={svgClassName}>
        {!intro && (
          <SvgAvatar
            styleName="cssHome.SVG--drawing"
            preserveAspectRatio="xMidYMid slice"
          />
        )}
        {AVATAR_INDICES.map(i => (
          <img
            key={`HOME__avatar--${i}`}
            styleName={`cssSvg.SVG--${i} cssHome.SVG--${i}`}
            src={imgAvatars[i.toString()]}
            alt="Siqi Tian"
          />
        ))}
      </div>

      <WebAnimation
        styleName="cssUtil.UTIL__cover cssHome.HOME__shade"
        keyframes={homeShade.keyframes}
        timing={homeShade.timing}
        shouldAnimate={avatar}
      />

      <div className="container">
        <div styleName="cssHome.HOME__content cssType.text-white">
          <HomeName
            shouldAnimate={avatar}
            isServer={server}
          />
          <p styleName="cssHome.HOME__placeholder cssType.text-white" />
          <HomeDescription
            title={title}
            shouldAnimate={avatar}
            shouldCycle={color}
            isServer={server}
          />
        </div>
      </div>
    </section>
  );
};

HomeSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    server: PropTypes.bool,
  }),
  animations: PropTypes.shape({
    ready: PropTypes.bool,
    avatar: PropTypes.bool,
    intro: PropTypes.bool,
    color: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHome: PropTypes.func,
  }),
};
HomeSection.defaultProps = {
  ...homeProps,
  actions: {
    animateHome: noOp,
  },
};


const mapStateToProps = state => (state[HOME]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSection);
