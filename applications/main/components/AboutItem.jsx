import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import { about as tween } from '../js/tweens.js';


const AboutItem = ({
  title,
  icon,
  description,
  index,
}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a className="ABOUT__box text-center">
      <SparkScroll.span
        className="ABOUT__icon"
        proxy="ABOUT__proxy"
        timeline={tween.icon(index * 20)}
      >
        <i className={`fa fa-fw fa-${icon}`} />
      </SparkScroll.span>
      <div className="ABOUT__text">
        <h4>{title}</h4>
        <p dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }} />
      </div>
    </a>
  </div>
);

AboutItem.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  description: React.PropTypes.string,
  index: React.PropTypes.number,
};


export default AboutItem;
