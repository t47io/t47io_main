import React from 'react';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { contactItem } from '../animations/contact.js';


const ContactItem = ({
  icon,
  url,
  index,
  shouldAnimate,
}) => (
  <WebAnimation
    tagName="li"
    keyframes={contactItem.keyframes}
    timing={contactItem.timing(index)}
    shouldAnimate={shouldAnimate}
  >
    <a
      href={url}
      target="_blank" rel="noopener noreferrer external"
      className="CONTACT__box text-center"
    >
      <span className="CONTACT__icon">
        <i className={`fa fa-${icon}`} />
      </span>
    </a>
  </WebAnimation>
);

ContactItem.propTypes = {
  icon: React.PropTypes.string,
  url: React.PropTypes.string,
  index: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
};
ContactItem.defaultProps = {
  icon: '',
  url: '',
  index: 0,
  shouldAnimate: false,
};


export default ContactItem;
