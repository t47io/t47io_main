import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import HomeDescription from '../components/HomeDescription.jsx';
import HomeName from '../components/HomeName.jsx';
import HomeTrigger from '../components/HomeTrigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import * as homeActions from '../actions/homeActions.js';
import { initialState as homeProps } from '../reducers/home.js';
import { HOME } from '../constants/sectionTypes.js';
import {
  TEXT_COLORS,
  SVG_BG_INDICES,
} from '../constants/util.js';

import {
  SvgAvatar,
  imgAvatar,
} from '../components/Images.js';
import { homeShade } from '../animations/home.js';

import '../stylesheets/HomeSection.scss';


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
  const svgClassName = (ready && avatar) ? 'active' : '';
  const arrowColorClassName = `text-${TEXT_COLORS[color % 2]}`;

  return (
    <section id="HOME__section">
      <HomeTrigger
        disabled={!ready}
        onToggleAnimation={animateHome}
      />
      <h1 className="HOME__name--seo">SIQI TIAN</h1>
      <div className={`SVG SVG--home ${svgClassName} SVG__background UTIL__parallax`}>
        <SvgAvatar
          className="SVG--0"
          preserveAspectRatio="xMidYMid slice"
        />
        {SVG_BG_INDICES.map(i => (
          <img
            key={`HOME__avatar--${i + 1}`}
            className={`SVG--${i + 1}`}
            src={imgAvatar[i]}
            alt="Siqi Tian"
          />
        ))}
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
          <i className={`fa fa-3x fa-fw fa-down-circled ${arrowColorClassName}`} />
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
    color: PropTypes.number,
  }),
  actions: PropTypes.shape({
    animateHome: PropTypes.func,
  }),
};
HomeSection.defaultProps = {
  ...homeProps,
  actions: {
    animateHome: () => {},
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
