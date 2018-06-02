import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { aboutItem } from '../animations/about.js';

import '../stylesheets/AboutSection.scss';


const AboutItem = ({
  title,
  icon,
  description,
  shouldAnimate,
  index,
}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a styleName="ABOUT__box" className="text-center">
      <WebAnimation
        styleName="ABOUT__icon"
        keyframes={aboutItem.keyframes}
        timing={aboutItem.timing(index)}
        shouldAnimate={shouldAnimate}
      >
        <i className={`fa fa-fw fa-${icon}`} />
      </WebAnimation>
      <div styleName="ABOUT__text">
        <h4 styleName="ABOUT__title">{title}</h4>
        <p
          styleName="ABOUT__detail"
          dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
        />
      </div>
    </a>
  </div>
);

AboutItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
AboutItem.defaultProps = {
  title: '',
  icon: '',
  description: '',
  shouldAnimate: false,
  index: 0,
};


export default AboutItem;
