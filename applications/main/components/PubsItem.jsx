import React from 'react';
import PropTypes from 'prop-types';

import PubsAuthor from './PubsAuthor.jsx';
import PubsCitation from './PubsCitation.jsx';
import PubsIssuePage from './PubsIssuePage.jsx';
import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { publicationThumbs } from './Images.js';
import { pubsItem } from '../animations/pubs.js';


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
    target: '_blank',
    rel: 'noopener noreferrer external',
  } : {};

  return (
    <WebAnimation
      className="row PUBS__entry"
      keyframes={pubsItem.keyframes}
      timing={pubsItem.timing(index)}
      shouldAnimate={shouldAnimate}
    >
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div className="PUBS__image">
          <a {...href}>
            <div
              className="UTIL__svg-thumb"
              data-tip={tag}
              data-for="PUBS__tooltip"
            >
              <i dangerouslySetInnerHTML={{ __html: publicationThumbs[tag] }} />
            </div>
          </a>
        </div>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 PUBS__text">
        <p className="text-gray">
          <PubsAuthor authors={authors} />
          <span> (</span>
          <b className="text-main-light">{year}</b>
          <span>) </span>
        </p>
        <p>
          <b>&quot;</b>
          <PubsTitle title={title} />
          <b>&quot;</b>
        </p>
        <p>
          <i className="main">{journal}</i>
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
        <hr className="hidden-lg hidden-md PUBS__hr" />
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
