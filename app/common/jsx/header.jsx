import React from 'react';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';


const SectionHeader = ({
  title,
  subtitle,
  proxyId,
  tween,
}) => (
  <SparkProxy.div className="container"
    proxyId={proxyId}
  >
    <SparkScroll.div className={`UTIL__section_header text-center ${proxyId}`}
      proxy={proxyId}
      timeline={tween}
    >
      <h2>{title}</h2>
      <div className="UTIL__divider" />
      <p className="UTIL__section_subtitle">
        {subtitle}
      </p>
    </SparkScroll.div>
  </SparkProxy.div>
);
SectionHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  proxyId: React.PropTypes.string.isRequired,
  tween: React.PropTypes.object.isRequired,
};


export default SectionHeader;
