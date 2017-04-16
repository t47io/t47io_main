import React from 'react';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { aboutItem } from '../animations/about.js';


const AboutItem = ({
  title,
  icon,
  description,
  shouldAnimate,
  index,
}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a className="ABOUT__box text-center">
      <WebAnimation
        className="ABOUT__icon"
        keyframes={aboutItem.keyframes}
        timing={aboutItem.timing(index)}
        shouldAnimate={shouldAnimate}
      >
        <i className={`fa fa-fw fa-${icon}`} />
      </WebAnimation>
      <div className="ABOUT__text">
        <h4 className="ABOUT__title">{title}</h4>
        <p
          className="ABOUT__detail"
          dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
        />
      </div>
    </a>
  </div>
);

AboutItem.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  description: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
};
AboutItem.defaultProps = {
  title: '',
  icon: '',
  description: '',
  shouldAnimate: false,
  index: 0,
};


export default AboutItem;
