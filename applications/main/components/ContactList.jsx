import React from 'react';
import PropTypes from 'prop-types';

import Audio from '../../common/components/Audio.jsx';
import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { audName } from './Audio.js';
import { contactPanel } from '../animations/contact.js';
import { noOp } from '../../common/util.js';
import { CONTACT_LEFT } from '../constants/sectionTypes.js';
import { EMAIL } from '../../config.js';

import cssType from '../../common/mixins/typography.scss';
import cssContact from '../stylesheets/ContactSection.scss';


const ContactList = ({
  resume,
  audio,
  counter,
  onToggleAudio,
  onToggleAnimation,
}) => {
  const audioPlayClassName = audio ? 'pause' : 'play';
  const objDate = new Date(`${resume.slice(4, 6)}/01/${resume.slice(0, 4)}`)
    .toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <Trigger onToggleAnimation={onToggleAnimation} />
      <WebAnimation
        tagName="h4"
        styleName="cssContact.CONTACT__title cssContact.CONTACT__list-item"
        keyframes={contactPanel.keyframes(CONTACT_LEFT)}
        timing={contactPanel.timing(0)}
        shouldAnimate={counter}
      >
        <i className="fa fa-street-view fa-lg fa-fw" />
        Find Me
      </WebAnimation>
      <ul styleName="cssContact.CONTACT__address">
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(1)}
          shouldAnimate={counter}
        >
          <i className="fa fa-location fa-lg fa-fw" />
          San Francisco Bay Area, California, USA
        </WebAnimation>
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(2)}
          shouldAnimate={counter}
        >
          <i className="fa fa-phone fa-lg fa-fw" />
          <i>int</i> ( <u>0x3D7C99F2E</u> )
        </WebAnimation>
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item cssContact.padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(3)}
          shouldAnimate={counter}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw" />
          <b>
            <a
              styleName="cssType.text-main-light"
              href="mailto:t47@alumni.stanford.edu"
              target="_blank"
              rel="noopener noreferrer external"
            >
              t47 @ alumni.stanford.edu
            </a>
          </b>
        </WebAnimation>
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(4)}
          shouldAnimate={counter}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw invisible" />
          <a
            styleName="cssType.text-gray-light"
            href={`mailto:${EMAIL}`}
            target="_blank"
            rel="noopener noreferrer external"
          >
            {EMAIL.replace('@', ' @ ')}
          </a>
        </WebAnimation>
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item cssContact.padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(5)}
          shouldAnimate={counter}
          propsForceUpdate={audio}
        >
          <i className="fa fa-megaphone fa-lg fa-fw" />
          <button
            type="button"
            styleName="cssContact.CONTACT__button cssContact.long"
            className="btn btn-default"
            onClick={onToggleAudio}
          >
            <i className="fa fa-file-audio fa-fw" />
            Proununciation
            <span styleName="cssContact.CONTACT__resume cssType.text-black">
              <i className={`fa fa-${audioPlayClassName} fa-fw`} />
            </span>
          </button>
          <Audio
            src={audName}
            play={audio}
            onFinish={onToggleAudio}
          />
        </WebAnimation>
        <WebAnimation
          tagName="li"
          styleName="cssContact.CONTACT__list-item cssContact.padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(6)}
          shouldAnimate={counter}
        >
          <i className="fa fa-download fa-lg fa-fw" />
          <a
            styleName="cssContact.CONTACT__button"
            className="btn btn-default"
            href="/resume/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-file-pdf fa-fw" />
            Résumé
            <span styleName="cssContact.CONTACT__resume cssType.text-black">
              <i className="fa fa-clock fa-fw" />
              <small>{objDate}</small>
            </span>
          </a>
        </WebAnimation>
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  resume: PropTypes.string,
  audio: PropTypes.bool,
  counter: PropTypes.bool,
  onToggleAudio: PropTypes.func,
  onToggleAnimation: PropTypes.func,
};
ContactList.defaultProps = {
  resume: '',
  audio: false,
  counter: false,
  onToggleAudio: noOp,
  onToggleAnimation: noOp,
};


export default ContactList;
