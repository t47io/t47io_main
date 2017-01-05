import React from 'react';
import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

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
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stanford, CA 94305, USA
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <i className="fa fa-phone fa-lg fa-fw"></i>
                  <img className="CONTACT__phone" alt="T47 phone no."
                    src={require('../img/t47_phone.gif')} />
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
              <form className="CONTACT__form" method="post" action="/send/" enctype="application/x-www-form-urlencoded">
                <SparkScroll.div className="form-group" timeline={tween.formRight} >
                  <input type="text" name="name" className="form-control input-lg" placeholder="Your Name" required />
                </SparkScroll.div>
                <SparkScroll.div className="form-group" timeline={tween.formRight} >
                  <input type="email" name="email" className="form-control input-lg" placeholder="E-mail" required />
                </SparkScroll.div>
                <SparkScroll.div className="form-group" timeline={tween.formRight} >
                  <input type="text" name="subject" className="form-control input-lg" placeholder="Subject" required />
                </SparkScroll.div>
                <SparkScroll.div className="form-group" timeline={tween.formRight} >
                  <textarea name="message" className="form-control input-lg" rows="5" placeholder="Message" required></textarea>
                </SparkScroll.div>
                <SparkScroll.div className="form-group" timeline={tween.formRight} >
                  <button type="submit" className="btn btn-default btn-block"><i className="fa fa-mail fa-lg fa-fw" id="send-icon"></i> Send</button>
                </SparkScroll.div>
              </form>
            </div>
          </div>
        </div>

      </Carousel>
    </section>
  );
}


export default ContactSection;
