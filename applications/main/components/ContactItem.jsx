import React from 'react';

import Animation from '../../common/components/Animation.jsx';


const ContactItem = ({
  icon = '',
  url = '',
  shouldAnimate = true,
}) => (
  <li>
    <a
      href={url}
      target="_blank" rel="noopener noreferrer external"
      className="CONTACT__box text-center"
    >
      <Animation
        tagName="span"
        className="CONTACT__icon"
        shouldAnimate={shouldAnimate}
      >
        <i className={`fa fa-${icon}`} />
      </Animation>
    </a>
  </li>
);

ContactItem.propTypes = {
  icon: React.PropTypes.string,
  url: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
};


export default ContactItem;
