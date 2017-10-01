import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import HomeDescription from '../components/HomeDescription.jsx';
import HomeName from '../components/HomeName.jsx';
import HomeTrigger from '../components/HomeTrigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';
import { imgAvatar } from '../components/Images.js';

import * as homeActions from '../actions/homeActions.js';
import { initialState as homeProps } from '../reducers/home.js';
import { HOME } from '../constants/sectionTypes.js';
import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';
import { homeShade } from '../animations/home.js';

import '../stylesheets/HomeSection.scss';

const avatarStyle = { backgroundImage: `url(${imgAvatar})` };


const HomeSection = ({
  data: {
    title,
    server,
  },
  animations: {
    ready,
    intro,
    color,
  },
  actions: {
    animateReady,
    animateIntro,
  },
}) => {
  const arrowColorClass = `text-${TEXT_COLOR_CYCLE[color % 2]}`;
  const avatarClass = (server || ready) ? '' : 'fade';

  return (
    <section id="HOME__section">
      <HomeTrigger
        disabled={!ready}
        onToggleAnimation={animateIntro}
      />
      <h1 className="HOME__name--seo">SIQI TIAN</h1>
      <div
        className={`UTIL__parallax HOME__avatar ${avatarClass}`}
        style={avatarStyle}
      >
        <img
          src={imgAvatar}
          alt="T47 Avatar"
          onLoad={animateReady}
          className="HOME__avatar--fake"
        />
      </div>

      <WebAnimation
        className="UTIL__cover HOME__shade"
        keyframes={homeShade.keyframes}
        timing={homeShade.timing}
        shouldAnimate={intro}
      />

      <div className="container" >
        <div className="HOME__content text-white">
          <HomeName
            intro={intro}
            server={server}
          />
          <p className="text-white HOME__placeholder" />
          <HomeDescription
            title={title}
            intro={intro}
            color={color}
            server={server}
          />
        </div>
        <div className="HOME__scroll-down">
          <i className={`fa fa-3x fa-fw fa-down-circled ${arrowColorClass}`} />
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
    intro: PropTypes.bool,
    color: PropTypes.number,
  }),
  actions: PropTypes.shape({
    animateReady: PropTypes.func,
    animateIntro: PropTypes.func,
  }),
};
HomeSection.defaultProps = {
  ...homeProps,
  actions: {
    animateReady: () => {},
    animateIntro: () => {},
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
