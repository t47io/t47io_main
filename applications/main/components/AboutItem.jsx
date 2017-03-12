import React from 'react';

import Animation from '../../common/components/Animation.jsx';


const AboutItem = ({
  title = '',
  icon = '',
  description = '',
  shouldAnimate = true,
}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a className="ABOUT__box text-center">
      <Animation
        className="ABOUT__icon"
        shouldAnimate={shouldAnimate}
      >
        <i className={`fa fa-fw fa-${icon}`} />
      </Animation>
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
  shouldAnimate: React.PropTypes.bool,
};


export default AboutItem;
