import React from 'react';

import Scrollspy from '../../common/components/Scrollspy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import ContactItem from '../components/ContactItem.jsx';
import ContactList from '../components/ContactList.jsx';
import ContactForm from '../components/ContactForm.jsx';

import '../stylesheets/ContactSection.scss';


const ContactSection = ({
  data: {
    items = [],
    background = [],
    resume = '',
    lens = {},
  },
  animations: {
    header = true,
    icon = items.length,
    left = lens.left,
    right = lens.right,
  },
  actions: {
    animateHeader = () => {},
    animateIcons = () => {},
    animateLeftItems = () => {},
    animateRightItems = () => {},
  },
}) => (
  <section id="CONTACT__section" className="text-white">
    <Carousel
      extraClassName="long"
      items={background}
      interval={4000}
    >
      <div className="UTIL__spacer-lg" />
      <SectionHeader
        title="contact me"
        subtitle="let's chat"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />

      <div className="container">
        <Scrollspy onToggleAnimation={animateIcons} />
        <ul className="CONTACT__social">
          {items.map((item, i) => (
            <ContactItem
              key={`CONTACT__icon-${i}`}
              shouldAnimate={i < icon}
              {...item}
            />
          ))}
        </ul>
      </div>
      <div className="UTIL__spacer-lg" />

      <div className="container">
        <div className="row">
          <ContactList
            resume={resume}
            counter={left}
            onToggleAnimation={animateLeftItems}
          />
          <ContactForm />
        </div>
      </div>
    </Carousel>
  </section>
);

ContactSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.array,
    background: React.PropTypes.array,
    resume: React.PropTypes.string,
    lens: React.PropTypes.shape({
      left: React.PropTypes.number,
      right: React.PropTypes.number,
    }),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    icon: React.PropTypes.number,
    left: React.PropTypes.number,
    right: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    aniamteIcons: React.PropTypes.func,
    animateLeftItems: React.PropTypes.func,
    animateRightItems: React.PropTypes.func,
  }),

};


export default ContactSection;
