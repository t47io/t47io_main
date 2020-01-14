import React from 'react';
import PropTypes from 'prop-types';

import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgThesis } from './Images.js';
import { pubsThesis } from '../animations/pubs.js';
import { SVG_INDICES } from '../../common/constants/util.js';

/* eslint-disable no-unused-vars */
import cssType from '../../common/mixins/typography.scss';
import cssSvg from '../stylesheets/svg.scss';
import cssPubs from '../stylesheets/PubsSection.scss';
/* eslint-enable */


const PubsThesis = ({
  title,
  url,
  links,
  shouldAnimate,
}) => (
  <WebAnimation
    styleName="cssPubs.PUBS__entry cssPubs.PUBS__thesis"
    className="row"
    keyframes={pubsThesis.keyframes}
    timing={pubsThesis.timing}
    shouldAnimate={shouldAnimate}
  >
    <div className="col-lg-1 col-md-1 hidden-sm hidden-xs" />
    <div styleName="cssPubs.PUBS__text" className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
      <h5 styleName="cssPubs.PUBS__find-more" className="text-center">
        <span className="fa-stack">
          <i styleName="cssType.text-main-light" className="fa fa-fw fa-blank fa-stack-2x" />
          <i styleName="cssType.text-white" className="fa fa-fw fa-graduation-cap fa-stack-1x" />
        </span>
        Ph.D. Dissertation
      </h5>
      <div styleName="cssSvg.SVG cssSvg.SVG--hover cssPubs.SVG cssPubs.PUBS__thesis-flyer">
        {SVG_INDICES.map(i => (
          <img
            key={`PUBS__thesis-flyer--${i}`}
            styleName={`cssSvg.SVG--${i} cssPubs.SVG--${i}`}
            src={imgThesis[i]}
            alt="PhD Thesis Flyer"
          />
        ))}
      </div>

      <h3 styleName="cssPubs.PUBS__thesis-title">
        <PubsTitle title={title} />
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </h3>
      <p styleName="cssPubs.PUBS__issue">
        <b>Siqi Tian</b>
        <span> (</span>
        <b styleName="cssType.text-main-light">Dec 2016</b>
        <span>) </span>
      </p>
      <p styleName="cssPubs.PUBS__issue">
        Department of Biochemistry, Stanford University
      </p>

      <p styleName="cssPubs.PUBS__thesis-links">
        {links.map(link => (
          <PubsLink
            key={link.title}
            url={`/phd/${link.tag}`}
            icon={link.icon}
            size={link.isHidden ? 'unavailable' : link.size}
            data-tip={link.title}
            data-for="PUBS__tooltip"
            styleName="cssPubs.PUBS__thesis-link-item"
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
