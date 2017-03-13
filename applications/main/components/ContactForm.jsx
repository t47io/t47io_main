import React from 'react';

import Animation from '../../common/components/Animation.jsx';
import Scrollspy from '../../common/components/Scrollspy.jsx';


const ContactForm = ({
  name = '',
  email = '',
  subject = '',
  message = '',
  isPending = false,
  isSuccess = false,
  isError = false,
  counter = 6,
  onChangeField = () => {},
  onSubmitForm = () => {},
  onToggleAnimation = () => {},
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
      <Scrollspy onToggleAnimation={onToggleAnimation} />
      <Animation
        tagName="h4"
        className="CONTACT__title CONTACT__form-item"
        shouldAnimate={counter > 0}
      >
        <i className="fa fa-paper-plane-empty fa-lg fa-fw" />
        Keep in Touch
      </Animation>

      <form
        className="CONTACT__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitForm();
        }}
      >
        <Animation
          className="form-group"
          shouldAnimate={counter > 1}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="CONTACT__form-item form-control input-lg"
            type="text" name="name" placeholder="Your Name"
            value={name} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ name: event.target.value })}
          />
        </Animation>
        <Animation
          className="CONTACT__form-item form-group"
          shouldAnimate={counter > 2}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="form-control input-lg"
            type="email" name="email" placeholder="E-mail"
            value={email} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ email: event.target.value })}
          />
        </Animation>
        <Animation
          className="CONTACT__form-item form-group"
          shouldAnimate={counter > 3}
          propsForceUpdate={shouldDisableForm}
        >
          <input
            className="form-control input-lg"
            type="text" name="subject" placeholder="Subject"
            value={subject} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ subject: event.target.value })}
          />
        </Animation>
        <Animation
          className="CONTACT__form-item form-group"
          shouldAnimate={counter > 4}
          propsForceUpdate={shouldDisableForm}
        >
          <textarea
            className="form-control input-lg"
            name="message" rows="5" placeholder="Message"
            value={message} required
            disabled={shouldDisableForm}
            onChange={event => onChangeField({ message: event.target.value })}
          />
        </Animation>
        <Animation
          className="CONTACT__form-item form-group"
          shouldAnimate={counter > 5}
          propsForceUpdate={`${shouldDisableForm} ${btnClassName} ${btnIconClassName}`}
        >
          <button
            className={`btn btn-${btnClassName} btn-block`}
            type="submit"
            disabled={shouldDisableForm}
          >
            <i className={`fa ${btnIconClassName} fa-lg fa-fw`} />
            SEND
          </button>
        </Animation>
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
  counter: React.PropTypes.number,
  onChangeField: React.PropTypes.func,
  onSubmitForm: React.PropTypes.func,
  onToggleAnimation: React.PropTypes.func,
};


export default ContactForm;
