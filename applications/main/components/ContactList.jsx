import React from 'react';

import Audio from '../../common/components/Audio.jsx';
import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { audName } from '../components/Audio.js';
import { contactPanel } from '../animations/contact.js';
import { CONTACT_LEFT } from '../constants/sectionTypes.js';
import { EMAIL } from '../../config.js';


const ContactList = ({
  resume,
  audio,
  counter,
  onToggleAudio,
  onToggleAnimation,
}) => {
  const audioPlayClass = audio ? 'pause' : 'play';
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
        className="CONTACT__title CONTACT__list-item"
        keyframes={contactPanel.keyframes(CONTACT_LEFT)}
        timing={contactPanel.timing(0)}
        shouldAnimate={counter}
      >
        <i className="fa fa-street-view fa-lg fa-fw" />
        Find Me
      </WebAnimation>
      <ul className="CONTACT__address">
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(1)}
          shouldAnimate={counter}
        >
          <i className="fa fa-location fa-lg fa-fw" />
          279 Campus Drive West, Room B419
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(2)}
          shouldAnimate={counter}
        >
          <i className="fa fa-location fa-lg fa-fw invisible" />
          Stanford, CA 94305, USA
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(3)}
          shouldAnimate={counter}
        >
          <i className="fa fa-phone fa-lg fa-fw" />
          <i>int</i> ( <u>0x3D7C99F2E</u> )
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(4)}
          shouldAnimate={counter}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw" />
          <b>
            <a
              className="text-main-light"
              href="mailto:t47@alumni.stanford.edu"
              target="_blank" rel="noopener noreferrer external"
            >
              t47 @ alumni.stanford.edu
            </a>
          </b>
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(5)}
          shouldAnimate={counter}
        >
          <i className="fa fa-mail-alt fa-lg fa-fw invisible" />
          <a
            className="text-gray-light"
            href={`mailto:${EMAIL}`}
            target="_blank" rel="noopener noreferrer external"
          >
            {EMAIL.replace('@', ' @ ')}
          </a>
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(4)}
          shouldAnimate={counter}
          propsForceUpdate={audio}
        >
          <i className="fa fa-megaphone fa-lg fa-fw" />
          <button
            className="CONTACT__button long btn btn-default"
            onClick={onToggleAudio}
          >
            <i className="fa fa-file-audio fa-fw" />
            Proununciation
            <span className="text-black CONTACT__resume">
              <i className={`fa fa-${audioPlayClass} fa-fw`} />
            </span>
          </button>
          <Audio
            src={audName} play={audio}
            onFinish={onToggleAudio}
          />
        </WebAnimation>
        <WebAnimation
          tagName="li"
          className="CONTACT__list-item padding"
          keyframes={contactPanel.keyframes(CONTACT_LEFT)}
          timing={contactPanel.timing(6)}
          shouldAnimate={counter}
        >
          <i className="fa fa-download fa-lg fa-fw" />
          <a
            className="CONTACT__button btn btn-default"
            href="/resume/"
            target="_blank" rel="noopener noreferrer"
          >
            <i className="fa fa-file-pdf fa-fw" />
            Résumé
            <span className="text-black CONTACT__resume">
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
  resume: React.PropTypes.string,
  audio: React.PropTypes.bool,
  counter: React.PropTypes.bool,
  onToggleAudio: React.PropTypes.func,
  onToggleAnimation: React.PropTypes.func,
};
ContactList.defaultProps = {
  resume: '',
  audio: false,
  counter: false,
  onToggleAudio: () => {},
  onToggleAnimation: () => {},
};


export default ContactList;
