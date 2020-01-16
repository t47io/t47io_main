import React from 'react';
import PropTypes from 'prop-types';

import PubsAuthor from './PubsAuthor.jsx';
import PubsCitation from './PubsCitation.jsx';
import PubsIssuePage from './PubsIssuePage.jsx';
import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgPublications } from './Images.js';
import { pubsItem } from '../animations/pubs.js';
import {
  SVG_INDICES,
  TARGET_BLANK,
} from '../../common/constants/util.js';

import cssType from '../../common/mixins/typography.scss';
import cssSvg from '../stylesheets/svg.scss';
import cssPubs from '../stylesheets/PubsSection.scss';


const PubsItem = ({
  year,
  authors,
  title,
  journal,
  issue,
  page,
  url,
  code,
  citation,
  tag,
  isPreprint,
  shouldAnimate,
  index,
}) => {
  const href = url ? {
    href: url,
    ...TARGET_BLANK,
  } : {};

  return (
    <WebAnimation
      styleName="cssPubs.PUBS__entry"
      className="row"
      keyframes={pubsItem.keyframes}
      timing={pubsItem.timing(index)}
      shouldAnimate={shouldAnimate}
    >
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div styleName="cssPubs.PUBS__image">
          <a {...href}>
            <div
              styleName="cssSvg.SVG cssSvg.SVG--hover cssPubs.SVG"
              data-tip={tag}
              data-for="PUBS__tooltip"
            >
              {SVG_INDICES.map(i => (
                <img
                  key={`PUBS__entry--${i}`}
                  styleName={`cssSvg.SVG--${i} cssPubs.SVG--${i}`}
                  src={imgPublications[i][tag]}
                  alt={tag}
                />
              ))}
            </div>
          </a>
        </div>
      </div>
      <div styleName="cssPubs.PUBS__text" className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <p styleName="cssType.text-gray">
          <PubsAuthor authors={authors} />
          <span> (</span>
          <b styleName="cssType.text-main-light">{year}</b>
          <span>) </span>
        </p>
        <p>
          <b>&quot;</b>
          <PubsTitle title={title} />
          <b>&quot;</b>
        </p>
        <p>
          <i styleName="cssType.text-main">{journal}</i>
          <PubsIssuePage
            issue={issue}
            page={page}
            isPreprint={isPreprint}
          />
          <PubsLink
            url={url}
            isPreprint={isPreprint}
            icon="file-word"
          />
          <PubsLink
            url={`/pdf/${tag}`}
            icon="file-pdf"
          />
          {code && (
            <PubsLink
              url={code}
              icon="file-code"
            />
          )}
          <br className="hidden-lg hidden-md" />
          <PubsCitation citation={citation} />
        </p>
        <br className="hidden-lg hidden-md" />
        <hr styleName="cssPubs.PUBS__hr" className="hidden-lg hidden-md" />
      </div>
    </WebAnimation>
  );
};

PubsItem.propTypes = {
  year: PropTypes.number,
  authors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  journal: PropTypes.string,
  issue: PropTypes.string,
  page: PropTypes.string,
  url: PropTypes.string,
  code: PropTypes.string,
  citation: PropTypes.number,
  tag: PropTypes.string,
  isPreprint: PropTypes.bool,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
PubsItem.defaultProps = {
  year: NaN,
  authors: [],
  title: '',
  journal: '',
  issue: '',
  page: '',
  url: '',
  code: '',
  citation: NaN,
  tag: '',
  isPreprint: false,
  shouldAnimate: false,
  index: 0,
};


export default PubsItem;
