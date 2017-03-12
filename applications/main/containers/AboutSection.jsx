import React from 'react';

import Scrollspy from '../../common/components/Scrollspy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import AboutItem from '../components/AboutItem.jsx';

import '../stylesheets/AboutSection.scss';


const AboutSection = ({
  data: { items = [] },
  animation: {
    header = true,
    icons = items.length,
  },
  actions: {
    animateHeader = () => {},
    animateIcons = () => {},
  },
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
        <Scrollspy
          offset="50%"
          onToggleAnimation={animateIcons}
        />
        <div className="row">
          {items.map((item, i) => (
            <AboutItem
              key={i}
              shouldAnimate={i < icons}
              {...item}
            />
          ))}
        </div>
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


export default AboutSection;
