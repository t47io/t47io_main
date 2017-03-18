import React from 'react';

import Trigger from '../../common/components/Trigger.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import AboutItem from '../components/AboutItem.jsx';

import '../stylesheets/AboutSection.scss';


const AboutSection = ({
  data: { items = [] },
  animations: {
    header = true,
    icon = items.length,
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
        <Trigger onToggleAnimation={animateIcons} />
        <div className="row">
          {items.map((item, i) => (
            <AboutItem
              key={`ABOUT__icon-${item.title}`}
              shouldAnimate={i < icon}
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
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    icon: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateIcons: React.PropTypes.func,
  }),
};


export default AboutSection;
