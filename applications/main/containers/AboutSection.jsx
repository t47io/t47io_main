import React from 'react';
import { SparkProxy } from '../../common/js/factory.js';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import AboutItem from '../components/AboutItem.jsx';

import { about as tween } from '../js/tweens.js';
import '../stylesheets/AboutSection.scss';


const AboutSection = ({ items }) => (
  <section id="ABOUT__section" className="text-center">
    <div className="UTIL__spacer-lg ABOUT__trigger" />
    <SectionHeader
      title="what i do" subtitle="what I enjoy & good at"
      proxyId="ABOUT__header"
      tween={tween.header}
    />

    <div className="ABOUT__content">
      <div className="container">
        <SparkProxy.div className="row" proxyId="ABOUT__proxy">
          {items.map((item, i) => (<AboutItem {...item} index={i} />))}
        </SparkProxy.div>
      </div>
    </div>
  </section>
);

AboutSection.propTypes = {
  items: React.PropTypes.array.isRequired,
};


export default AboutSection;
