import React from 'react';

import PubsAuthor from './PubsAuthor.jsx';
import PubsCitation from './PubsCitation.jsx';
import PubsIssuePage from './PubsIssuePage.jsx';
import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

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
              className="SPRITE"
              data-tip={tag}
              data-for="PUBS__tooltip"
            >
              <div className={`SPRITE__pubs-${tag}`} />
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
  year: React.PropTypes.number,
  authors: React.PropTypes.arrayOf(React.PropTypes.string),
  title: React.PropTypes.string,
  journal: React.PropTypes.string,
  issue: React.PropTypes.string,
  page: React.PropTypes.string,
  url: React.PropTypes.string,
  code: React.PropTypes.string,
  citation: React.PropTypes.number,
  tag: React.PropTypes.string,
  isPreprint: React.PropTypes.bool,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
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
