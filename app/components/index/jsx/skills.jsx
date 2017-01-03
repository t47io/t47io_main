import React from 'react';
import SectionHeader from '../../common/jsx/header.jsx';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {skills as tween} from '../js/tweens.js';


const ProgressBar = ({value, tag, title, index}) => (
  <SparkProxy.div proxyId={`SKILLS__proxy${tag}_${index}`} >
    <SparkScroll.div className={`SKILLS__progress ${tag}`}
      proxy={`SKILLS__proxy${tag}_${index}`}
      timeline={tween[`progress${tag}`]} >
      <div className="SKILLS__bar" role="progressbar" aria-valuenow={`${value}`} aria-valuemin="0" aria-valuemax="100" style={{width: `${value}%`}} >{title}</div>
    </SparkScroll.div>
  </SparkProxy.div>
);

const SkillsPanel = ({title, icon, tag, items, index}) => (
  <div>
    <div className="SKILLS__title">
      <h6><i className={`fa fa-fw fa-lg ${icon}`}></i> {title}</h6>
    </div>
    {items.map((item, i) => (<ProgressBar {...item} tag={tag} index={`${index}-${i}`} />))}
  </div>
);

const SkillsSection = ({items}) => (
  <section id="SKILLS__section">
    <div className="UTIL__spacer-hg SKILLS__trigger"></div>
    <SectionHeader title="my skills" subtitle="what I learned" proxyId="SKLLLS__header" tween={tween.header} />

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel left">
            {items.left.map((panel, i) => (<SkillsPanel {...panel} tag="Left" index={i} />))}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel right">
            {items.left.map((panel, i) => (<SkillsPanel {...panel} tag="Right" index={i} />))}
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default SkillsSection;
