import React from 'react';
import PropTypes from 'prop-types';

import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgThesis } from './Images.js';
import { pubsThesis } from '../animations/pubs.js';
import { SVG_INDICES } from '../../common/constants/util.js';


const PubsThesis = ({
  title,
  url,
  links,
  shouldAnimate,
}) => (
  <WebAnimation
    className="row PUBS__entry PUBS__thesis"
    keyframes={pubsThesis.keyframes}
    timing={pubsThesis.timing}
    shouldAnimate={shouldAnimate}
  >
    <div className="col-lg-1 col-md-1 hidden-sm hidden-xs" />
    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 PUBS__text">
      <h5 className="PUBS__find-more text-center">
        <span className="fa-stack">
          <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
          <i className="fa fa-fw fa-graduation-cap fa-stack-1x text-white" />
        </span>
        Ph.D. Dissertation
      </h5>
      <div className="SVG SVG--hover PUBS__thesis-flyer">
        {SVG_INDICES.map(i => (
          <img
            key={`PUBS__thesis-flyer--${i}`}
            className={`SVG--${i}`}
            src={imgThesis[i]}
            alt="PhD Thesis Flyer"
          />
        ))}
      </div>

      <h3 className="PUBS__thesis-title">
        <PubsTitle title={title} />
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </h3>
      <p className="PUBS__issue">
        <b>Siqi Tian</b>
        <span> (</span>
        <b className="text-main-light">Dec 2016</b>
        <span>) </span>
      </p>
      <p className="PUBS__issue">
        Department of Biochemistry, Stanford University
      </p>

      <p className="PUBS__thesis-links">
        {links.map(link => (
          <PubsLink
            key={link.title}
            url={`/phd/${link.tag}`}
            icon={link.icon}
            size={link.isHidden ? 'unavailable' : link.size}
            data-tip={link.title}
            data-for="PUBS__tooltip"
            className="PUBS__thesis-link-item"
          />
        ))}
      </p>
    </div>
    <div className="col-lg-1 col-md-1 hidden-sm hidden-xs" />
  </WebAnimation>
);

PubsThesis.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    tag: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.string,
    isHidden: PropTypes.bool,
  })),
  shouldAnimate: PropTypes.bool,
};
PubsThesis.defaultProps = {
  title: '',
  url: '',
  links: [],
  shouldAnimate: false,
};


export default PubsThesis;
