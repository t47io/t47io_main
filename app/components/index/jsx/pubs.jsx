import React from 'react';

const data = require('../../../config/pubs.json');


const PubsItem = ({year, author, title, journal, issue, page, url, code, citation, tag, is_preprint, is_hidden}) => {
  if (is_hidden) { return; }
  const urlExt = is_preprint ? "javascript:void(0)" : url;
  const urlPDF = is_preprint ? "javascript:void(0)" : `/pdf/${tag}`;
  const urlClass = is_preprint ? "text-light-gray" : "text-dark-green bg-light-green";

  const issuePage = is_preprint ? (<span>, <span className="text-gray">{issue}</span>.</span>) : (<span><b>{issue}</b>: {page}.</span>);
  const codeLink = code ? (<a href={code} target="_blank" rel="noopener noreferrer external" className="text-dark-green bg-light-green"><i className="fa fa-fw fa-file-code-o"></i></a>): "";
  const citeClass = citation ? "text-main" : "text-gray";

  return (
    <div className="row PUBS__entry">
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div className="PUBS__image">
          <a href={urlExt} target="_blank" rel="noopener noreferrer external">
            <div className="sprite publication_sprite" data-wenk-pos="right" data-wenk={tag}><div className={`pub_${tag}`}></div></div>
          </a>
        </div>
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 PUBS__text">
        <p className="text-gray">{author} (<b className="text-light-green">{year}</b>)</p>
        <p><b style="font-size:16px;" dangerouslySetInnerHTML={{__html: `"${title}"`}}></b></p>
        <p style="padding-top:5px;">
          <i className="text-green">{journal}</i>
          {issuePage}
          <a href="urlExt" target="_blank" rel="noopener noreferrer external" className={urlClass}><i className="fa fa-fw fa-file-word-o"></i></a>
          <a href="urlPDF" target="_blank" rel="noopener noreferrer external" className={urlClass}><i className="fa fa-fw fa-file-pdf-o"></i></a>
          {codeLink}
          <span className="pull-right text-gray bg-light-gray">
            <i className="fa fa-fw fa-balance-scale"></i>
            <i><small>Cited by :</small></i>
            <u className={citeClass}>{citation}</u>
          </span>
        </p>
        <br className="hidden-lg hidden-md" />
        <hr className="hidden-lg hidden-md" />
      </div>
    </div>
  );
};

const PubsYearPanel = ({year, items}) => (
  <div className="row PUBS__row">
    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 PUBS__year">
      {year}
    </div>
    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9 PUBS__content">
      {items.map((item) => (<PubsItem {...item} year={year} />))}
    </div>
  </div>
);

const PubsSection = () => (
  <section id="PUBS__section">
    <div className="extra-space-xxl PUBS__trigger"></div>
    <div className="container">
      <div className="page-header text-center PUBS__header">
        <h2>my research</h2>
        <div className="divider"></div>
        <p className="subtitle">what I published</p>
      </div>
    </div>

    <div className="container" id="pub-content">
      {data.items.map((item) => (<PubsYearPanel {...item} />))}

      <div className="extra-space-l"></div>
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <h4 className="text-gray text-center">
            <span className="fa-stack">
              <i className="fa fa-fw fa-square fa-stack-2x text-light-green"></i>
              <i className="fa fa-fw fa-search fa-stack-1x text-white"></i>
            </span>
            Find more on <a href="{{links.google_scholar}}" target="_blank" rel="noopener noreferrer external">Google Scholar <i className="fa fa-fw fa-sm fa-external-link"></i></a> and <a href="{{links.pubmed}}" target="_blank" rel="noopener noreferrer external">PubMed <i className="fa fa-fw fa-sm fa-external-link"></i></a>.
          </h4>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
      </div>
    </div>
    <div className="extra-space-xl CONTACT__trigger"></div>
  </section>
);


export default PubsSection;
