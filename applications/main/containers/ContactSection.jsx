import React from 'react';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';

import SectionHeader from '../../common/components/Header.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import ContactItem from '../components/ContactItem.jsx';
import ContactForm from '../components/ContactForm.jsx';

import { contact as tween } from '../js/tweens.js';
import '../stylesheets/ContactSection.scss';

const imgPhone = require('../images/t47_phone.png');


const ContactSection = ({
  items,
  background,
  resume,
}) => {
  const date = resume.slice(7, -4);
  const objDate = new Date(`${date.slice(4, 6)}/01/1900`);

  return (
    <section id="CONTACT__section" className="text-white">
      <Carousel extraClassName="long"
        items={background} interval={4000}
      >
        <div className="UTIL__spacer-lg" />
        <SectionHeader title="contact me" subtitle="let's chat"
          proxyId="CONTACT__header"
          tween={tween.header}
        />

        <SparkProxy.div className="container"
          proxyId="CONTACT__proxy"
        >
          <ul className="CONTACT__social">
            {items.map(item => (<ContactItem {...item} />))}
          </ul>
        </SparkProxy.div>
        <div className="UTIL__spacer-lg" />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 className="CONTACT__title"
                timeline={tween.listLeft}
              >
                <i className="fa fa-street-view fa-lg fa-fw" />
                Find Me
              </SparkScroll.h4>
              <ul className="CONTACT__address">
                <SparkScroll.li style={{ paddingBottom: '0.8em' }}
                  timeline={tween.listLeft}
                >
                  <i className="fa fa-location fa-lg fa-fw" />
                  279 Campus Drive West, Room B419
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft}>
                  <i className="fa fa-location fa-lg fa-fw" style={{ visibility: 'hidden' }} />
                  Stanford, CA 94305, USA
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft}>
                  <i className="fa fa-phone fa-lg fa-fw" />
                  <img className="CONTACT__phone" alt="T47 phone no."
                    src={imgPhone}
                  />
                </SparkScroll.li>
                <SparkScroll.li style={{ paddingBottom: '0.8em' }}
                  timeline={tween.listLeft}
                >
                  <i className="fa fa-mail-alt fa-lg fa-fw" />
                  <b>
                    <a className="text-light-green" href="mailto:t47@alumni.stanford.edu" target="_blank" rel="noopener noreferrer external">
                      t47 @ alumni.stanford.edu
                    </a>
                  </b>
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft}>
                  <i className="fa fa-mail-alt fa-lg fa-fw" style={{ visibility: 'hidden' }} />
                  <a className="text-light-gray" href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">
                    contact @ t47.io
                  </a>
                </SparkScroll.li>
                <SparkScroll.li timeline={tween.listLeft}>
                  <a className="btn btn-default" href="/resume/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-download fa-fw" />
                    Resume
                    <span className="text-main CONTACT__resume">
                      <i className="fa fa-clock fa-fw" style={{ marginRight: 0 }} />
                      <small>
                        {objDate.toLocaleString('en-us', { month: 'short' })}
                        {` ${date.slice(0, 4)}`}
                      </small>
                    </span>
                  </a>
                </SparkScroll.li>
              </ul>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <SparkScroll.h4 className="CONTACT__title"
                timeline={tween.formRight}
              >
                <i className="fa fa-paper-plane-empty fa-lg fa-fw" />
                Keep in Touch
              </SparkScroll.h4>
              <ContactForm />
            </div>
          </div>
        </div>

      </Carousel>
    </section>
  );
};

ContactSection.propTypes = {
  items: React.PropTypes.array.isRequired,
  background: React.PropTypes.array.isRequired,
  resume: React.PropTypes.string.isRequired,
};


export default ContactSection;
