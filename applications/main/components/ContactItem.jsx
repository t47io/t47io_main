import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { contactItem } from '../animations/contact.js';

import '../stylesheets/ContactSection.scss';


const ContactItem = ({
  icon,
  url,
  shouldAnimate,
  index,
}) => (
  <WebAnimation
    tagName="li"
    styleName="CONTACT__item"
    keyframes={contactItem.keyframes}
    timing={contactItem.timing(index)}
    shouldAnimate={shouldAnimate}
  >
    <a
      href={url}
      target="_blank" rel="noopener noreferrer external"
      styleName="CONTACT__box"
      className="text-center"
    >
      <span styleName="CONTACT__icon">
        <i className={`fa fa-${icon}`} />
      </span>
    </a>
  </WebAnimation>
);

ContactItem.propTypes = {
  icon: PropTypes.string,
  url: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
ContactItem.defaultProps = {
  icon: '',
  url: '',
  shouldAnimate: false,
  index: 0,
};


export default ContactItem;
