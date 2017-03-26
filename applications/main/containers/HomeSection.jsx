import React from 'react';

import TypeWriter from '../../common/components/TypeWriter.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';
import {
  homeName,
  homeShade,
} from '../animations/home.js';

import '../stylesheets/HomeSection.scss';

const imgAvatar = require('../images/t47_avatar.jpg');
const imgName = require('../images/t47_name.png');

const avatarStyle = { backgroundImage: `url(${imgAvatar})` };
const imgLoaderStyle = { display: 'none' };


const HomeSection = ({
  data: { title },
  animations: {
    name,
    type,
    shade,
    color,
  },
  actions: {
    animateName,
    animateTitle,
    animateShade,
  },
}) => (
  <section id="HOME__section">
    <div
      className="UTIL__parallax"
      style={avatarStyle}
    >
      <img
        src={imgAvatar}
        alt="T47 Avatar"
        style={imgLoaderStyle}
        onLoad={() => {
          document.querySelector('.LOAD__container').className += ' ready';
          animateName(true);
          animateTitle(true);
          animateShade(true);
        }}
      />
    </div>

    <WebAnimation
      className="UTIL__cover HOME__shade"
      keyframes={homeShade.keyframes}
      timing={homeShade.timing}
      shouldAnimate={shade}
    />

    <div className="container">
      <div className="HOME__content text-white">
        <WebAnimation
          keyframes={homeName.keyframes}
          timing={homeName.timing}
          shouldAnimate={name}
        >
          <img
            src={imgName}
            alt="Siqi Tian"
            className="HOME__title"
          />
        </WebAnimation>
        <p className="text-white HOME__placeholder" />
        <TypeWriter
          className={`HOME__typewrite text-${'textColor'}`}
          cursorClassName="HOME__cursor"
          fullText={title}
          delay={1250}
          shouldAnimate={type && !!title.length}
        />
      </div>
      <div
        className="HOME__scroll_down"
      >
        <i className={`fa fa-3x fa-fw fa-down-circled text-${'arrowColor'}`} />
      </div>

    </div>
  </section>
);

HomeSection.propTypes = {
  data: React.PropTypes.shape({
    title: React.PropTypes.string,
  }),
  animations: React.PropTypes.shape({
    name: React.PropTypes.bool,
    type: React.PropTypes.bool,
    shade: React.PropTypes.bool,
    color: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateName: React.PropTypes.func,
    animateTitle: React.PropTypes.func,
    animateShade: React.PropTypes.func,
  }),
};
HomeSection.defaultProps = {
  data: {
    title: '',
  },
  animations: {
    name: false,
    type: false,
    shade: false,
    color: 0,
  },
  actions: {
    animateName: () => {},
    animateTitle: () => {},
    animateShade: () => {},
  },
};


export default HomeSection;
