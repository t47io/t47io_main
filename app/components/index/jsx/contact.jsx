import React from 'react';
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

const ContactSection = ({items, resume}) => {
  const date = resume.slice(7, -4);
  const objDate = new Date(`${date.slice(4, 6)}/01/1900`);
  
  return (
    <section id="CONTACT__section" class="text-white">
      <div class="stanford parallax bg_rotate_fade">
        <div id="contact-carousel" class="carousel carousel-fade slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#contact-carousel" data-slide-to="0" class="active"></li>
            <li data-target="#contact-carousel" data-slide-to="1"></li>
            <li data-target="#contact-carousel" data-slide-to="2"></li>
            <li data-target="#contact-carousel" data-slide-to="3"></li>
            <li data-target="#contact-carousel" data-slide-to="4"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="item active" data-slide-to="0"></div>
            <div class="item" data-slide-to="1"></div>
            <div class="item" data-slide-to="2"></div>
            <div class="item" data-slide-to="3"></div>
            <div class="item" data-slide-to="4"></div>
          </div>
        </div>

        <div class="cover"></div>
        <SparkProxy.div class="container" proxyId="CONTACT__header">
          <SparkScroll.div class="page-header text-center CONTACT__header"
            proxy="CONTACT__header"
            timeline={tween.header} >
            <h2>Contact me</h2>
            <div class="divider"></div>
            <p class="subtitle">let's chat</p>
          </SparkScroll.div>
        </SparkProxy.div>

        <SparkProxy.div class="container" proxyId="CONTACT__proxy" >
          <ul class="CONTACT__social">
            {items.map((item) => (<ContactItem {...item} />))}
          </ul>
        </SparkProxy.div>
        <div class="extra-space-l"></div>
        
        <div class="contact">
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
                    <i class="fa fa-phone fa-lg fa-fw"></i><img src="/img/t47/t47_phone.gif" alt="T47 phone no." style="height:1.1em; vertical-align:text-top;" />
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
        </div>

      </div>
    </section>
  );
}


export default ContactSection;
