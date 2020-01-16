import React from 'react';
import PropTypes from 'prop-types';

import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { contactPanel } from '../animations/contact.js';
import { noOp } from '../../common/util.js';
import { CONTACT_RIGHT } from '../constants/sectionTypes.js';
import {
  FORM_FIELDS,
  FORM_FIELD_DEFAULTS,
  EMAIL_ERROR_CODES,
} from '../constants/util.js';

import '../stylesheets/ContactSection.scss';


const ContactForm = ({
  isPending,
  isSuccess,
  isError,
  errorCode,
  counter,
  onChangeField,
  onSubmitForm,
  onToggleAnimation,
  ...fieldProps
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
  let btnDisplayText = 'Send';
  if (errorCode) {
    btnDisplayText = EMAIL_ERROR_CODES[errorCode];
  } else if (isPending) {
    btnDisplayText = 'Sending...';
  } else if (isSuccess) {
    btnDisplayText = 'Sent!';
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <Trigger onToggleAnimation={onToggleAnimation} />
      <WebAnimation
        tagName="h4"
        styleName="CONTACT__title CONTACT__form-item"
        keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
        timing={contactPanel.timing(0)}
        shouldAnimate={counter}
      >
        <i className="fa fa-paper-plane-empty fa-lg fa-fw" />
        Keep in Touch
      </WebAnimation>

      <form
        styleName="CONTACT__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitForm();
        }}
      >
        {FORM_FIELDS.map((field, i) => (
          <WebAnimation
            styleName="CONTACT__form-item"
            className="form-group"
            keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
            timing={contactPanel.timing(i + 1)}
            shouldAnimate={counter}
            propsForceUpdate={shouldDisableForm}
          >
            {field.type === 'textarea' ? (
              <textarea
                {...FORM_FIELD_DEFAULTS}
                styleName="CONTACT__form-textarea"
                {...field}
                value={fieldProps[field.name]}
                disabled={shouldDisableForm}
                onChange={event => onChangeField({ [field.name]: event.target.value })}
              />
            ) : (
              <input
                {...FORM_FIELD_DEFAULTS}
                {...field}
                value={fieldProps[field.name]}
                disabled={shouldDisableForm}
                onChange={event => onChangeField({ [field.name]: event.target.value })}
              />
            )}
          </WebAnimation>
        ))}
        <WebAnimation
          styleName="CONTACT__form-item"
          className="form-group"
          keyframes={contactPanel.keyframes(CONTACT_RIGHT)}
          timing={contactPanel.timing(5)}
          shouldAnimate={counter}
          propsForceUpdate={`${shouldDisableForm} ${btnClassName} ${btnIconClassName}`}
        >
          <button
            styleName="CONTACT__form-button"
            className={`btn btn-${btnClassName} btn-block`}
            type="submit"
            disabled={shouldDisableForm}
          >
            <i className={`fa ${btnIconClassName} fa-lg fa-fw`} />
            {btnDisplayText}
          </button>
        </WebAnimation>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  subject: PropTypes.string,
  message: PropTypes.string,
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  errorCode: PropTypes.number,
  counter: PropTypes.bool,
  onChangeField: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onToggleAnimation: PropTypes.func,
};
ContactForm.defaultProps = {
  name: '',
  email: '',
  subject: '',
  message: '',
  isPending: false,
  isSuccess: false,
  isError: false,
  errorCode: NaN,
  counter: false,
  onChangeField: noOp,
  onSubmitForm: noOp,
  onToggleAnimation: noOp,
};


export default ContactForm;
