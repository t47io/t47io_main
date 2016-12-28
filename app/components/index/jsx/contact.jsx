import React from 'react';


const ContactItem = ({icon, url}) => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer external" class="CONTACT__box text-center"><span class="CONTACT__icon"><i class={`fa fa-${icon}`}></i></span></a>
  </li>
);

const ContactSection = ({items, resume}) => (
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
      <div class="container">
        <div class="page-header text-center CONTACT__header">
          <h2>Contact me</h2>
          <div class="divider"></div>
          <p class="subtitle">let's chat</p>
        </div>
      </div>

      <div class="container">
        <ul class="CONTACT__social">
          {items.map((item) => (<ContactItem {...item} />))}
        </ul>
      </div>
      <div class="extra-space-l"></div>
      
      <div class="contact">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h4 class="CONTACT__title"><i class="fa fa-street-view fa-lg fa-fw"></i> Find Me</h4>
              <ul class="CONTACT__address">
                <li>
                  <i class="fa fa-map-marker fa-lg fa-fw"></i>279 Campus Drive West, Room B419
                  <br/><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stanford, CA 94305, USA
                </li>
                <li><i class="fa fa-phone fa-lg fa-fw"></i><img src="/img/t47/t47_phone.gif" alt="T47 phone no." style="height:1.1em; vertical-align:text-top;" /></li>
                <li>
                  <i class="fa fa-envelope fa-lg fa-fw"></i>
                  <b><a class="text-light-green" href="mailto:t47@alumni.stanford.edu" target="_blank" rel="noopener noreferrer external">t47 @ alumni.stanford.edu</a></b> | 
                  <a class="text-light-gray" href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">contact @ t47.io</a>
                </li>
                <li>
                  <a href="/resume/" target="_blank" rel="noopener" class="btn btn-default"><i class="fa fa-download fa-fw"></i> Resume
                    <span class="text-main CONTACT__resume"><i class="fa fa-clock-o fa-fw" style="margin-right:0px;"></i> <small>{resume}</small></span></a>
                  </li>
              </ul>
            </div>
          
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h4 class="CONTACT__title"><i class="fa fa-paper-plane-o fa-lg fa-fw"></i> Keep in Touch</h4>
              <form class="CONTACT__form" method="post" action="/send/" enctype="application/x-www-form-urlencoded">
                <div class="form-group">
                  <input type="text" name="name" class="form-control input-lg" placeholder="Your Name" required />
                </div>
                <div class="form-group">
                  <input type="email" name="email" class="form-control input-lg" placeholder="E-mail" required />
                </div>
                <div class="form-group">
                  <input type="text" name="subject" class="form-control input-lg" placeholder="Subject" required />
                </div>
                <div class="form-group">
                  <textarea name="message" class="form-control input-lg" rows="5" placeholder="Message" required></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-default btn-block"><i class="fa fa-envelope-o fa-lg fa-fw" id="send-icon"></i> Send</button>
                </div>
                </form>
            </div>
                                      
          </div>
        </div>
      </div>

    </div>
  </section>
);


export default ContactSection;
