import React from 'react';
import 'whatwg-fetch';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import {contact as tween} from '../js/tweens.js';


const ContactItem = ({icon, url}) => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer external" className="CONTACT__box text-center">
      <SparkScroll.span className="CONTACT__icon"
       proxy="CONTACT__proxy"
       timeline={tween.icon} >
        <i className={`fa fa-${icon}`}></i>
      </SparkScroll.span>
    </a>
  </li>
);


class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
      isError: false,
      isSuccess: false
    };
    this.input = {};
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      ...(this.state),
      isSending: true
    });

    fetch('/send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.input.name.value,
        email: this.input.email.value,
        subject: this.input.subject.value,
        message: this.input.message.value
      })
    })
    .then((response) => {
      this.setState({
        isSending: false,
        isError: ([400, 403, 500].indexOf(response.status) !== -1),
        isSuccess: (response.status === 201)
      }, () => {
        if (this.state.isSuccess) { window.location.href = '/send'; }
      });
      setTimeout(() => {
        this.setState({
          ...(this.state),
          isError: false
        })
      }, 5000);
    });

  }

  render() {
    const {isSending, isError, isSuccess} = this.state;
    const icon = isSending ? "fa-cog fa-spin" : (isError ? "fa-cancel-circled" : (isSuccess ? "fa-ok-circled" : "fa-mail"));

    return (
      <form className="CONTACT__form" onSubmit={this.onSubmit.bind(this)} >
        <SparkScroll.div className="form-group" timeline={tween.formRight} >
          <input type="text" name="name" className="form-control input-lg" placeholder="Your Name" required ref={(input) => { this.input.name = input; }} />
        </SparkScroll.div>
        <SparkScroll.div className="form-group" timeline={tween.formRight} >
          <input type="email" name="email" className="form-control input-lg" placeholder="E-mail" required ref={(input) => { this.input.email = input; }} />
        </SparkScroll.div>
        <SparkScroll.div className="form-group" timeline={tween.formRight} >
          <input type="text" name="subject" className="form-control input-lg" placeholder="Subject" required ref={(input) => { this.input.subject = input; }} />
        </SparkScroll.div>
        <SparkScroll.div className="form-group" timeline={tween.formRight} >
          <textarea name="message" className="form-control input-lg" rows="5" placeholder="Message" required ref={(input) => { this.input.message = input; }} ></textarea>
        </SparkScroll.div>
        <SparkScroll.div className="form-group" timeline={tween.formRight} >
          <button type="submit" className={`btn btn-${isError ? "danger" : "default"} btn-block`} disabled={isSending} >
            <i className={`fa ${icon} fa-lg fa-fw`} ></i>
            &nbsp;Send
          </button>
        </SparkScroll.div>
      </form>
    );
  }
}


const ContactSection = ({items, background, resume}) => {
  const date = resume.slice(7, -4);
  const objDate = new Date(`${date.slice(4, 6)}/01/1900`);
  
  return (
    <section id="CONTACT__section" className="text-white">
      <Carousel extraClassName="long"
        items={background} interval={4000} >
        <div className="UTIL__spacer-lg"></div>
        <SectionHeader title="contact me" subtitle="let's chat" proxyId="CONTACT__header" tween={tween.header} />

        <SparkProxy.div className="container" proxyId="CONTACT__proxy" >
          <ul className="CONTACT__social">
            {items.map((item) => (<ContactItem {...item} />))}
          </ul>
        </SparkProxy.div>
        <div className="UTIL__spacer-lg"></div>
        
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 className="CONTACT__title" timeline={tween.listLeft} >
                <i className="fa fa-street-view fa-lg fa-fw"></i> Find Me
              </SparkScroll.h4>
              <ul className="CONTACT__address">
                <SparkScroll.li timeline={tween.listLeft} >
                  <i className="fa fa-location fa-lg fa-fw"></i>279 Campus Drive West, Room B419
                  <br/><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stanford, CA 94305, USA
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <i className="fa fa-phone fa-lg fa-fw"></i>
                  <img className="CONTACT__phone" alt="T47 phone no."
                    src={require('../img/t47_phone.png')} />
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <i className="fa fa-mail-alt fa-lg fa-fw"></i>
                  <b><a className="text-light-green" href="mailto:t47@alumni.stanford.edu" target="_blank" rel="noopener noreferrer external">t47 @ alumni.stanford.edu</a></b> |&nbsp;
                  <a className="text-light-gray" href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">contact @ t47.io</a>
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <a href="/resume/" target="_blank" rel="noopener" className="btn btn-default"><i className="fa fa-download fa-fw"></i> Resume
                    <span className="text-main CONTACT__resume">
                      &nbsp;<i className="fa fa-clock fa-fw" style="margin-right: 0"></i> <small>{objDate.toLocaleString('en-us', {month: 'short'})} {date.slice(0, 4)}</small>
                    </span>
                  </a>
                </SparkScroll.li>
              </ul>
            </div>
          
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 className="CONTACT__title" timeline={tween.formRight} >
                <i className="fa fa-paper-plane-empty fa-lg fa-fw"></i> Keep in Touch
              </SparkScroll.h4>
              <ContactForm />
            </div>
          </div>
        </div>

      </Carousel>
    </section>
  );
}


export default ContactSection;
