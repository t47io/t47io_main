import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import { contact as tween } from '../js/tweens.js';


const ContactItem = ({
  icon,
  url,
}) => (
  <li>
    <a
      href={url}
      target="_blank" rel="noopener noreferrer external"
      className="CONTACT__box text-center"
    >
      <SparkScroll.span
        className="CONTACT__icon"
        proxy="CONTACT__proxy"
        timeline={tween.icon}
      >
        <i className={`fa fa-${icon}`} />
      </SparkScroll.span>
    </a>
  </li>
);

ContactItem.propTypes = {
  icon: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};


export default ContactItem;
