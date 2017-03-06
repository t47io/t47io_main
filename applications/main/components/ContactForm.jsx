import 'whatwg-fetch';
import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import { contact as tween } from '../js/tweens.js';


class ContactForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
      isError: false,
      isSuccess: false,
    };
    this.input = {};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      ...(this.state),
      isSending: true,
    });

    fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.input.name.value,
        email: this.input.email.value,
        subject: this.input.subject.value,
        message: this.input.message.value,
      }),
    })
    .then((response) => {
      this.setState({
        isSending: false,
        isError: ([400, 403, 500].indexOf(response.status) !== -1),
        isSuccess: (response.status === 201),
      }, () => {
        if (this.state.isSuccess) { window.location.href = '/send?success=1'; }
      });
      setTimeout(() => {
        this.setState({
          ...(this.state),
          isError: false,
        });
      }, 5000);
    });
  }

  render() {
    const { isSending, isError, isSuccess } = this.state;
    let icon = 'fa-mail';
    if (isSending) {
      icon = 'fa-cog fa-spin';
    } else if (isError) {
      icon = 'fa-cancel-circled';
    } else if (isSuccess) {
      icon = 'fa-ok-circled';
    }

    return (
      <form className="CONTACT__form"
        onSubmit={this.onSubmit}
      >
        <SparkScroll.div className="form-group"
          timeline={tween.formRight}
        >
          <input type="text" name="name" placeholder="Your Name" required
            className="form-control input-lg"
            ref={(input) => { this.input.name = input; }}
          />
        </SparkScroll.div>
        <SparkScroll.div className="form-group"
          timeline={tween.formRight}
        >
          <input type="email" name="email" placeholder="E-mail" required
            className="form-control input-lg"
            ref={(input) => { this.input.email = input; }}
          />
        </SparkScroll.div>
        <SparkScroll.div className="form-group"
          timeline={tween.formRight}
        >
          <input type="text" name="subject" placeholder="Subject" required
            className="form-control input-lg"
            ref={(input) => { this.input.subject = input; }}
          />
        </SparkScroll.div>
        <SparkScroll.div className="form-group"
          timeline={tween.formRight}
        >
          <textarea name="message"rows="5" placeholder="Message" required
            className="form-control input-lg"
            ref={(input) => { this.input.message = input; }}
          />
        </SparkScroll.div>
        <SparkScroll.div className="form-group"
          timeline={tween.formRight}
        >
          <button type="submit" disabled={isSending}
            className={`btn btn-${isError ? 'danger' : 'default'} btn-block`}
          >
            <i className={`fa ${icon} fa-lg fa-fw`} />
            SEND
          </button>
        </SparkScroll.div>
      </form>
    );
  }
}


export default ContactForm;
