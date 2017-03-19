import React from 'react';

import Carousel from '../../common/components/Carousel.jsx';
import ContactForm from '../components/ContactForm.jsx';
import ContactItem from '../components/ContactItem.jsx';
import ContactList from '../components/ContactList.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import '../stylesheets/ContactSection.scss';


const ContactSection = ({
  data: {
    items,
    backgrounds,
    resume,
  },
  form: {
    name,
    email,
    subject,
    message,
    isPending,
    isSuccess,
    isError,
  },
  animations: {
    header,
    icon,
    left,
    right,
  },
  actions: {
    animateHeader,
    animateIcons,
    animateLeftItems,
    animateRightItems,
    changeEmailField,
    submitEmail,
  },
}) => (
  <section id="CONTACT__section" className="text-white">
    <Carousel
      className="long"
      items={backgrounds}
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
        <Trigger onToggleAnimation={animateIcons} />
        <ul className="CONTACT__social">
          {items.map((item, i) => (
            <ContactItem
              key={`CONTACT__icon-${i}`}
              index={i + 1}
              shouldAnimate={icon}
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
          <ContactForm
            name={name}
            email={email}
            subject={subject}
            message={message}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            counter={right}
            onChangeField={changeEmailField}
            onSubmitForm={submitEmail}
            onToggleAnimation={animateRightItems}
          />
        </div>
      </div>
    </Carousel>
  </section>
);

ContactSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    backgrounds: React.PropTypes.arrayOf(React.PropTypes.string),
    resume: React.PropTypes.string,
  }),
  form: React.PropTypes.shape({
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    subject: React.PropTypes.string,
    message: React.PropTypes.string,
    isPending: React.PropTypes.bool,
    isSuccess: React.PropTypes.bool,
    isError: React.PropTypes.bool,
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    icon: React.PropTypes.bool,
    left: React.PropTypes.bool,
    right: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateIcons: React.PropTypes.func,
    animateLeftItems: React.PropTypes.func,
    animateRightItems: React.PropTypes.func,
    changeEmailField: React.PropTypes.func,
    submitEmail: React.PropTypes.func,
  }),
};
ContactSection.defaultProps = {
  data: {
    items: [],
    backgrounds: [],
    resume: '',
  },
  form: {
    name: '',
    email: '',
    subject: '',
    message: '',
    isPending: false,
    isSuccess: false,
    isError: false,
  },
  animations: {
    header: false,
    icon: false,
    left: false,
    right: false,
  },
  actions: {
    animateHeader: () => {},
    animateIcons: () => {},
    animateLeftItems: () => {},
    animateRightItems: () => {},
    changeEmailField: () => {},
    submitEmail: () => {},
  },
};


export default ContactSection;
