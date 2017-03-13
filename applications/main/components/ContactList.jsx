import React from 'react';

import Animation from '../../common/components/Animation.jsx';
import Scrollspy from '../../common/components/Scrollspy.jsx';

const imgPhone = require('../images/t47_phone.png');


const ContactList = ({
  resume = '',
  counter = 7,
  onToggleAnimation = () => {},
}) => {
  const date = resume.slice(7, -4);
  const objDate = new Date(`${date.slice(4, 6)}/01/${date.slice(0, 4)}`);

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <Scrollspy onToggleAnimation={onToggleAnimation} />
      <Animation
        tagName="h4"
        className="CONTACT__title CONTACT__list-item"
        shouldAnimate={counter > 0}
      >
        <i className="fa fa-street-view fa-lg fa-fw" />
        Find Me
      </Animation>
      <ul className="CONTACT__address">
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 1}
          style={{ paddingBottom: '0.8em' }}
        >
          <i className="fa fa-location fa-lg fa-fw" />
          279 Campus Drive West, Room B419
        </Animation>
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 2}
        >
          <i className="fa fa-location fa-lg fa-fw" style={{ visibility: 'hidden' }} />
          Stanford, CA 94305, USA
        </Animation>
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 3}
        >
          <i className="fa fa-phone fa-lg fa-fw" />
          <img
            className="CONTACT__phone"
            alt="T47 phone no."
            src={imgPhone}
          />
        </Animation>
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 4}
          style={{ paddingBottom: '0.8em' }}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw" />
          <b>
            <a className="text-light-green" href="mailto:t47@alumni.stanford.edu" target="_blank" rel="noopener noreferrer external">
              t47 @ alumni.stanford.edu
            </a>
          </b>
        </Animation>
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 5}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw" style={{ visibility: 'hidden' }} />
          <a className="text-light-gray" href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external">
            contact @ t47.io
          </a>
        </Animation>
        <Animation
          tagName="li"
          className="CONTACT__list-item"
          shouldAnimate={counter > 6}
        >
          <a className="btn btn-default" href="/resume/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-download fa-fw" />
            Resume
            <span className="text-main CONTACT__resume">
              <i className="fa fa-clock fa-fw" style={{ marginRight: 0 }} />
              <small>
                {objDate.toLocaleString('en-us', { month: 'short', year: 'numeric' })}
              </small>
            </span>
          </a>
        </Animation>
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  resume: React.PropTypes.string,
  counter: React.PropTypes.number,
  onToggleAnimation: React.PropTypes.func,
};


export default ContactList;
