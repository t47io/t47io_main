import React from 'react';
import ReactTooltip from 'react-tooltip';
import { SparkScroll } from '../../common/js/factory.js';

import SectionHeader from '../../common/components/Header.jsx';
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

  const issuePage = isPreprint ? (
    <span style={{ marginLeft: '0.5em' }}>
      , <span className="text-gray">{issue}</span>.
    </span>
  ) : (
    <span style={{ marginLeft: '0.5em' }}>
      <b>{issue}</b>: {page}.
    </span>
  );
  const codeLink = code ? (
    <a href={code} target="_blank" rel="noopener noreferrer external" className="text-dark-green bg-light-green">
      <i className="fa fa-fwn fa-file-code" />
    </a>
  ) : null;
  const citeElement = citation ? (
    <span className="PUBS__cite pull-right text-gray bg-light-gray">
      <i className="fa fa-fw fa-balance-scale" />
      <i>
        <small>Cited by :</small>
      </i>
      <u className="text-main" style={{ paddingLeft: '0.5em' }}>{citation}</u>
    </span>
  ) : null;

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
          {issuePage}
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
          {codeLink}
          {citeElement}
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

const PubsYearPanel = ({
  year,
  items,
}) => (
  <div className="row PUBS__row">
    <SparkScroll.div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 PUBS__year"
      timeline={tween.year}
    >
      {year}
    </SparkScroll.div>
    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9 PUBS__content">
      {items.filter(item => (!item.isHidden)).map(item => (
        <PubsItem {...item} year={year} />
      ))}
    </div>
  </div>
);
PubsYearPanel.propTypes = {
  year: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
};

const PubsSection = ({
  items,
  links,
}) => (
  <section id="PUBS__section">
    <div className="UTIL__spacer-md PUBS__trigger" />
    <SectionHeader title="my research" subtitle="what I published"
      proxyId="PUBS__header"
      tween={tween.header}
    />

    <div className="container">
      {items.map(item => (<PubsYearPanel {...item} />))}
      <ReactTooltip effect="solid" place="bottom" id="PUBS__tooltip" />

      <div className="UTIL__spacer-lg" />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <h4 className="text-gray text-center">
            <span className="fa-stack">
              <i className="fa fa-fw fa-blank fa-stack-2x text-light-green" />
              <i className="fa fa-fw fa-search fa-stack-1x text-white" />
            </span>
            Find more on
            <a href={links.googleScholar} target="_blank" rel="noopener noreferrer external"
              className="PUBS__link"
            >
              Google Scholar
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>
            and
            <a href={links.pubmed} target="_blank" rel="noopener noreferrer external"
              className="PUBS__link"
            >
              PubMed
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>.
          </h4>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      </div>
    </div>
    <div className="UTIL__spacer-xl CONTACT__trigger" />
  </section>
);
PubsSection.propTypes = {
  items: React.PropTypes.array.isRequired,
  links: React.PropTypes.shape({
    googleScholar: React.PropTypes.string.isRequired,
    pubmed: React.PropTypes.string.isRequired,
  }),
};


export default PubsSection;
