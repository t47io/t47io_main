import React from 'react';
import { SparkProxy } from '../../common/js/factory.js';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import AboutItem from '../components/AboutItem.jsx';

import '../stylesheets/sections/AboutSection.scss';


const AboutSection = ({
  data: { items },
  animation: { header },
  actions: { animateHeader },
}) => (
  <section id="ABOUT__section" className="text-center">
    <div className="UTIL__spacer-lg ABOUT__trigger" />
    <SectionHeader
      title="what i do"
      subtitle="what I enjoy & good at"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
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
  data: React.PropTypes.shape({
    items: React.PropTypes.array,
  }),
  animation: React.PropTypes.shape({
    header: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
  }),
};
AboutSection.defaultProps = {
  data: { items: [] },
  animation: {
    header: true,
  },
  actions: {
    animateHeader: () => {},
  },
};


export default AboutSection;
