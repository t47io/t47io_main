import React from 'react';

import AboutItem from '../components/AboutItem.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import '../stylesheets/AboutSection.scss';


const AboutSection = ({
  data: { items },
  animations: {
    header,
    icon,
  },
  actions: {
    animateHeader,
    animateIcons,
  },
}) => (
  <section id="ABOUT__section" className="text-center">
    <div className="UTIL__spacer-md ABOUT__trigger" />
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
              key={`ABOUT__icon-${i}`}
              shouldAnimate={icon}
              index={i}
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
    items: React.PropTypes.arrayOf(React.PropTypes.object),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    icon: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateIcons: React.PropTypes.func,
  }),
};
AboutSection.defaultProps = {
  data: {
    items: [],
  },
  animations: {
    header: false,
    icon: false,
  },
  actions: {
    animateHeader: () => {},
    animateIcons: () => {},
  },
};


export default AboutSection;
