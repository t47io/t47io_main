import React from 'react';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import SectionHeader from '../../common/jsx/header.jsx';
import {about as tween} from '../js/tweens.js';


const AboutItem = ({title, icon, description, index}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a href="javascript:void(0)" className="ABOUT__box text-center">
      <SparkScroll.span className="ABOUT__icon"
        proxy="ABOUT__proxy"
        timeline={tween.icon(index*20)} >
        <i className={`fa fa-fw fa-${icon}`}></i>
      </SparkScroll.span>
      <div className="ABOUT__text">
        <h4>{title}</h4>
        <p dangerouslySetInnerHTML={{__html: description.replace(/\n/g, '<br/>')}} ></p>
      </div>
    </a>
  </div>
);

const AboutSection = ({items}) => (
  <section id="ABOUT__section" className="text-center">
    <div className="UTIL__spacer-lg ABOUT__trigger"></div>
    <SectionHeader title="what i do" subtitle="what I enjoy & good at" proxyId="ABOUT__header" tween={tween.header} />

    <div className="ABOUT__content">
      <div className="container">
        <SparkProxy.div className="row" proxyId="ABOUT__proxy">
          {items.map((item, i) => (<AboutItem {...item} index={i} />))}
        </SparkProxy.div>
      </div>
    </div>
  </section>
);


export default AboutSection;
