import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import PubsIssuePage from './PubsIssuePage.jsx';
import PubsCodeLink from './PubsCodeLink.jsx';
import PubsCiteElement from './PubsCiteElement.jsx';

import { pubs as tween } from '../js/tweens.js';


const PubsItem = ({
  year,
  author,
  title,
  journal,
  issue,
  page,
  url,
  code,
  citation,
  tag,
  isPreprint,
}) => {
  const urlExt = url ? { href: url } : {};
  const urlPDF = isPreprint ? {} : { href: `/pdf/${tag}.pdf` };
  const urlClass = isPreprint ? 'text-light-gray' : 'text-dark-green bg-light-green';

  return (
    <SparkScroll.div className="row PUBS__entry"
      timeline={tween.entry}
    >
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div className="PUBS__image">
          <a href={urlExt} target="_blank" rel="noopener noreferrer external">
            <div className="SPRITE" data-tip={tag} data-for="PUBS__tooltip">
              <div className={`SPRITE__pubs-${tag}`} />
            </div>
          </a>
        </div>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 PUBS__text">
        <p className="text-gray">
          <span dangerouslySetInnerHTML={{ __html: author.replace('Tian, S.,', '<u class="text-main bg-light-gray">Tian, S.,</u>') }} />
          {' ('}
          <b className="text-light-green">{year}</b>
          )
        </p>
        <p>
          <b className="PUBS__title" dangerouslySetInnerHTML={{ __html: `"${title}"` }} />
        </p>
        <p>
          <i className="text-green">{journal}</i>
          <PubsIssuePage
            issue={issue}
            page={page}
            isPreprint={isPreprint}
          />
          <a {...urlExt} target="_blank" rel="noopener noreferrer external"
            className={urlClass}
          >
            <i className="fa fa-fwn fa-file-word" />
          </a>
          <a {...urlPDF} target="_blank" rel="noopener noreferrer external"
            className={urlClass}
          >
            <i className="fa fa-fwn fa-file-pdf" />
          </a>
          <PubsCodeLink code={code} />
          <PubsCiteElement citation={citation} />
        </p>
        <br className="hidden-lg hidden-md" />
        <hr className="hidden-lg hidden-md" />
      </div>
    </SparkScroll.div>
  );
};

PubsItem.propTypes = {
  year: React.PropTypes.number.isRequired,
  author: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  journal: React.PropTypes.string.isRequired,
  issue: React.PropTypes.string.isRequired,
  page: React.PropTypes.string,
  url: React.PropTypes.string,
  code: React.PropTypes.string,
  citation: React.PropTypes.number,
  tag: React.PropTypes.string.isRequired,
  isPreprint: React.PropTypes.bool,
};


export default PubsItem;
