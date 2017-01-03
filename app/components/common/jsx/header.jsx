import React from 'react';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';


const SectionHeader = ({title, subtitle, proxyId, tween}) => (
  <SparkProxy.div class="container" proxyId={proxyId} >
    <SparkScroll.div class={`UTIL__section_header text-center ${proxyId}`}
      proxy={proxyId}
      timeline={tween} >
      <h2>{title}</h2>
      <div class="UTIL__divider"></div>
      <p class="UTIL__section_subtitle">{subtitle}</p>
    </SparkScroll.div>
  </SparkProxy.div>
);


export default SectionHeader;
