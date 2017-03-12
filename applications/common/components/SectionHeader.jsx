import React from 'react';
import Scrollspy from './Scrollspy.jsx';
import Animation from './Animation.jsx';

import '../stylesheets/SectionHeader.scss';


const SectionHeader = ({
  title = '',
  subtitle = '',
  shouldAnimate = true,
  beginClassName = 'ANIMATION__begin',
  endClassName = 'ANIMATION__end',
  onToggleAnimation = () => {},
}) => (
  <div className="UTIL__section_header">
    <Scrollspy onToggleAnimation={onToggleAnimation} />
    <Animation
      beginClassName={beginClassName}
      endClassName={endClassName}
      shouldAnimate={shouldAnimate}
    >
      <h2>{title}</h2>
      <div className="UTIL__divider" />
      <p className="UTIL__section_subtitle">
        {subtitle}
      </p>
    </Animation>
  </div>
);

SectionHeader.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  beginClassName: React.PropTypes.string,
  endClassName: React.PropTypes.string,
  onToggleAnimation: React.PropTypes.func,
};


export default SectionHeader;
