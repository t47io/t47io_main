import React from 'react';

import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { contactPanel } from '../animations/contact.js';
import { CONTACT_RIGHT } from '../constants/sectionTypes.js';


const ContactForm = ({
  name,
  email,
  subject,
  message,
  isPending,
  isSuccess,
  isError,
  counter,
  onChangeField,
  onSubmitForm,
  onToggleAnimation,
}) => {
  const shouldDisableForm = isPending || isError;
  const btnClassName = isError ? 'danger' : 'default';
  let btnIconClassName = 'fa-mail';
  if (isPending) {
    btnIconClassName = 'fa-cog fa-spin';
  } else if (isError) {
    btnIconClassName = 'fa-cancel-circled';
  } else if (isSuccess) {
    btnIconClassName = 'fa-ok-circled';
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <Trigger onToggleAnimation={onToggleAnimation} />
      <WebAnimation
        tagName="h4"
        className="CONTACT__title CONTACT__form-item"
        keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
        timing={contactPanel.timing(0)}
        shouldAnimate={counter}
      >
        <i className="fa fa-paper-plane-empty fa-lg fa-fw" />
        Keep in Touch
      </WebAnimation>

      <form
        className="CONTACT__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitForm();
        }}
      >
        <WebAnimation
          className="form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(1)}
          shouldAnimate={counter}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="CONTACT__form-item form-control input-lg"
            type="text" name="name" placeholder="Your Name"
            value={name} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ name: event.target.value })}
          />
        </WebAnimation>
        <WebAnimation
          className="CONTACT__form-item form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(2)}
          shouldAnimate={counter}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="form-control input-lg"
            type="email" name="email" placeholder="E-mail"
            value={email} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ email: event.target.value })}
          />
        </WebAnimation>
        <WebAnimation
          className="CONTACT__form-item form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(3)}
          shouldAnimate={counter}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="form-control input-lg"
            type="text" name="subject" placeholder="Subject"
            value={subject} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ subject: event.target.value })}
          />
        </WebAnimation>
        <WebAnimation
          className="CONTACT__form-item form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(4)}
          shouldAnimate={counter}
          propsForceUpdate={shouldDisableForm}
        >
          <textarea
            className="CONTACT__form-textarea form-control input-lg"
            name="message" rows="5" placeholder="Message"
            value={message} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ message: event.target.value })}
          />
        </WebAnimation>
        <WebAnimation
          className="CONTACT__form-item form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(5)}
          shouldAnimate={counter}
          propsForceUpdate={`${shouldDisableForm} ${btnClassName} ${btnIconClassName}`}
        >
          <button
            className={`CONTACT__form-button btn btn-${btnClassName} btn-block`}
            type="submit"
            disabled={shouldDisableForm}
          >
            <i className={`fa ${btnIconClassName} fa-lg fa-fw`} />
            SEND
          </button>
        </WebAnimation>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  subject: React.PropTypes.string,
  message: React.PropTypes.string,
  isPending: React.PropTypes.bool,
  isSuccess: React.PropTypes.bool,
  isError: React.PropTypes.bool,
  counter: React.PropTypes.bool,
  onChangeField: React.PropTypes.func,
  onSubmitForm: React.PropTypes.func,
  onToggleAnimation: React.PropTypes.func,
};
ContactForm.defaultProps = {
  name: '',
  email: '',
  subject: '',
  message: '',
  isPending: false,
  isSuccess: false,
  isError: false,
  counter: false,
  onChangeField: () => {},
  onSubmitForm: () => {},
  onToggleAnimation: () => {},
};


export default ContactForm;
