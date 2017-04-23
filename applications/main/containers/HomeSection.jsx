import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeTrigger from '../components/HomeTrigger.jsx';
import TypeWriter from '../../common/components/TypeWriter.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import {
  imgAvatar,
  imgName,
} from '../components/HomeImages.js';
import * as homeActions from '../actions/homeActions.js';
import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';
import {
  homeName,
  homeShade,
} from '../animations/home.js';

import '../stylesheets/HomeSection.scss';

const avatarStyle = { backgroundImage: `url(${imgAvatar})` };


const HomeSection = ({
  data: { title },
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
  const textColorClass = `text-${TEXT_COLOR_CYCLE[color]}`;
  const arrowColorClass = `text-${TEXT_COLOR_CYCLE[color % 2]}`;

  return (
    <section id="HOME__section">
      <HomeTrigger
        disabled={!ready}
        onToggleAnimation={animateIntro}
      />
      <div
        className="UTIL__parallax"
        style={avatarStyle}
      >
        <img
          src={imgAvatar}
          alt="T47 Avatar"
          onLoad={animateReady}
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
          <WebAnimation
            className="HOME__title"
            keyframes={homeName.keyframes}
            timing={homeName.timing}
            shouldAnimate={intro}
          >
            <img
              className="HOME__name"
              src={imgName}
              alt="Siqi Tian"
            />
          </WebAnimation>
          <p className="text-white HOME__placeholder" />
          <TypeWriter
            className={`HOME__typewrite ${textColorClass}`}
            cursorClassName="HOME__cursor"
            fullText={title}
            delay={1250}
            shouldAnimate={intro}
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
  data: React.PropTypes.shape({
    title: React.PropTypes.string,
  }),
  animations: React.PropTypes.shape({
    ready: React.PropTypes.bool,
    intro: React.PropTypes.bool,
    color: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateReady: React.PropTypes.func,
    animateIntro: React.PropTypes.func,
  }),
};
HomeSection.defaultProps = {
  data: {
    title: '',
  },
  animations: {
    ready: false,
    intro: false,
    color: 0,
  },
  actions: {
    animateReady: () => {},
    animateIntro: () => {},
  },
};


const mapStateToProps = state => (state.home);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSection);
