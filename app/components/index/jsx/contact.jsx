import React from 'react';
import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {contact as tween} from '../js/tweens.js';


const ContactItem = ({icon, url}) => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer external" class="CONTACT__box text-center">
      <SparkScroll.span class="CONTACT__icon"
       proxy="CONTACT__proxy"
       timeline={tween.icon} >
        <i class={`fa fa-${icon}`}></i>
      </SparkScroll.span>
    </a>
  </li>
);

const ContactSection = ({items, background, resume}) => {
  const date = resume.slice(7, -4);
  const objDate = new Date(`${date.slice(4, 6)}/01/1900`);
  
  return (
    <section id="CONTACT__section" class="text-white">
      <Carousel extraClassName="long"
        items={background} interval={4000} >
        <SectionHeader title="contact me" subtitle="let's chat" proxyId="CONTACT__header" tween={tween.header} />

        <SparkProxy.div class="container" proxyId="CONTACT__proxy" >
          <ul class="CONTACT__social">
            {items.map((item) => (<ContactItem {...item} />))}
          </ul>
        </SparkProxy.div>
        <div class="UTIL__spacer-lg"></div>
        
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 class="CONTACT__title" timeline={tween.listLeft} >
                <i class="fa fa-street-view fa-lg fa-fw"></i> Find Me
              </SparkScroll.h4>
              <ul class="CONTACT__address">
                <SparkScroll.li timeline={tween.listLeft} >
                  <i class="fa fa-map-marker fa-lg fa-fw"></i>279 Campus Drive West, Room B419
                  <br/><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stanford, CA 94305, USA
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <i class="fa fa-phone fa-lg fa-fw"></i>
                  <img src={require('../img/contact_phone.gif')} alt="T47 phone no." style="height:1.1em; vertical-align:text-top;" />
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <i class="fa fa-envelope fa-lg fa-fw"></i>
                  <b><a class="text-light-green" href="mailto:t47@alumni.stanford.edu" target="_blank" rel="noopener noreferrer external">t47 @ alumni.stanford.edu</a></b> |&nbsp;
                  <a class="text-light-gray" href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">contact @ t47.io</a>
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft} >
                  <a href="/resume/" target="_blank" rel="noopener" class="btn btn-default"><i class="fa fa-download fa-fw"></i> Resume
                    <span class="text-main CONTACT__resume">
                      &nbsp;<i class="fa fa-clock-o fa-fw" style="margin-right:0px;"></i> <small>{objDate.toLocaleString('en-us', {month: 'short'})} {date.slice(0, 4)}</small>
                    </span>
                  </a>
                </SparkScroll.li>
              </ul>
            </div>
          
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 class="CONTACT__title" timeline={tween.formRight} >
                <i class="fa fa-paper-plane-o fa-lg fa-fw"></i> Keep in Touch
              </SparkScroll.h4>
              <form class="CONTACT__form" method="post" action="/send/" enctype="application/x-www-form-urlencoded">
                <SparkScroll.div class="form-group" timeline={tween.formRight} >
                  <input type="text" name="name" class="form-control input-lg" placeholder="Your Name" required />
                </SparkScroll.div>
                <SparkScroll.div class="form-group" timeline={tween.formRight} >
                  <input type="email" name="email" class="form-control input-lg" placeholder="E-mail" required />
                </SparkScroll.div>
                <SparkScroll.div class="form-group" timeline={tween.formRight} >
                  <input type="text" name="subject" class="form-control input-lg" placeholder="Subject" required />
                </SparkScroll.div>
                <SparkScroll.div class="form-group" timeline={tween.formRight} >
                  <textarea name="message" class="form-control input-lg" rows="5" placeholder="Message" required></textarea>
                </SparkScroll.div>
                <SparkScroll.div class="form-group" timeline={tween.formRight} >
                  <button type="submit" class="btn btn-default btn-block"><i class="fa fa-envelope-o fa-lg fa-fw" id="send-icon"></i> Send</button>
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
