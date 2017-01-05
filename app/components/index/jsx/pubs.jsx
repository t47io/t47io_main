import React from 'react';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import SectionHeader from '../../common/jsx/header.jsx';
import {pubs as tween} from '../js/tweens.js';


const PubsItem = ({year, author, title, journal, issue, page, url, code, citation, tag, is_preprint, is_hidden}) => {
  if (is_hidden) { return; }
  const urlExt = is_preprint ? "javascript:void(0)" : url;
  const urlPDF = is_preprint ? "javascript:void(0)" : `/pdf/${tag}.pdf`;
  const urlClass = is_preprint ? "text-light-gray" : "text-dark-green bg-light-green";

  const issuePage = is_preprint ? (<span>, <span className="text-gray">{issue}</span>.</span>) : (<span><b>{issue}</b>: {page}.</span>);
  const codeLink = code ? (<a href={code} target="_blank" rel="noopener noreferrer external" className="text-dark-green bg-light-green"><i className="fa fa-fw fa-file-code"></i></a>): "";
  const citeClass = citation ? "text-main" : "text-gray";

  return (
    <SparkScroll.div className="row PUBS__entry"
      timeline={tween.entry} >
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div className="PUBS__image">
          <a href={urlExt} target="_blank" rel="noopener noreferrer external">
            <div className="SPRITE" data-wenk-pos="right" data-wenk={tag}>
              <div className={`SPRITE__pubs-${tag}`}></div>
            </div>
          </a>
        </div>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 PUBS__text">
        <p className="text-gray"><span dangerouslySetInnerHTML={{__html: author.replace('Tian, S.,', '<u class="text-main bg-light-gray">Tian, S.,</u>')}}></span> (<b className="text-light-green">{year}</b>)</p>
        <p><b className="PUBS__title" dangerouslySetInnerHTML={{__html: `"${title}"`}}></b></p>
        <p>
          <i className="text-green">{journal}</i>
          &nbsp;{issuePage}
          <a href={urlExt} target="_blank" rel="noopener noreferrer external" className={urlClass}><i className="fa fa-fw fa-file-word"></i></a>
          <a href={urlPDF} target="_blank" rel="noopener noreferrer external" className={urlClass}><i className="fa fa-fw fa-file-pdf"></i></a>
          {codeLink}
          <span className="PUBS__cite pull-right text-gray bg-light-gray">
            <i className="fa fa-fw fa-balance-scale"></i>
            &nbsp;<i><small>Cited by :</small></i>&nbsp;
            <u className={citeClass}>{citation}</u>
          </span>
        </p>
        <br className="hidden-lg hidden-md" />
        <hr className="hidden-lg hidden-md" />
      </div>
    </SparkScroll.div>
  );
};

const PubsYearPanel = ({year, items}) => (
  <div className="row PUBS__row">
    <SparkScroll.div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 PUBS__year"
      timeline={tween.year} >
      {year}
    </SparkScroll.div>
    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9 PUBS__content">
      {items.map((item) => (<PubsItem {...item} year={year} />))}
    </div>
  </div>
);

const PubsSection = ({items, links}) => (
  <section id="PUBS__section">
    <div className="UTIL__spacer-md PUBS__trigger"></div>
    <SectionHeader title="my research" subtitle="what I published" proxyId="PUBS__header" tween={tween.header} />

    <div className="container">
      {items.map((item) => (<PubsYearPanel {...item} />))}

      <div className="UTIL__spacer-lg"></div>
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <h4 className="text-gray text-center">
            <span className="fa-stack">
              <i className="fa fa-fw fa-blank fa-stack-2x text-light-green"></i>
              <i className="fa fa-fw fa-search fa-stack-1x text-white"></i>
            </span>
            Find more on <a href={links.google_scholar} target="_blank" rel="noopener noreferrer external">Google Scholar <i className="fa fa-fw fa-sm fa-link-ext"></i></a> and <a href={links.pubmed} target="_blank" rel="noopener noreferrer external">PubMed <i className="fa fa-fw fa-sm fa-link-ext"></i></a>.
          </h4>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
      </div>
    </div>
    <div className="UTIL__spacer-xl CONTACT__trigger"></div>
  </section>
);


export default PubsSection;
