import React from 'react';

const data = require('../../../config/portfolio.json');


const PortfolioFilter = ({name}) => (
  <li><a href="#" data-filter={`.${name}`} >{name.replace(/\-/g, ' ')}</a></li>
);

const PortfolioItem = ({name, category, description, title, url}) => (
  <div className={`col-xs-12 col-sm-6 col-md-4 col-lg-4 ${category} PORTFOLIO__entry`}>
    <div className="PORTFOLIO__item">
      <div className="sprite"><div className={`thumb_${name}`} ></div></div>
      <div className="PORTFOLIO__text">
        <a href={url ? url : `/project/${name}`} target="_blank" rel="noopener">{title} <i className="fa fa-fw fa-md fa-external-link"></i></a>
        <span dangerouslySetInnerHTML={{__html: description}} ></span>
      </div>
    </div>
  </div>
);

const PortfolioSection = () => (
  <section id="PORTFOLIO__section">
    <div className="row PORTFOLIO__trigger">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="container">
          <div className="page-header text-center PORTFOLIO__header">
            <h2>My Works</h2>
            <div className="divider"></div>
            <p className="subtitle">what I am proud of</p>
          </div>
        </div>

        <p className="text-gray text-center">
          <span className="fa-stack">
            <i className="fa fa-fw fa-square fa-stack-2x text-light-green"></i>
            <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white"></i>
          </span>
          Click for more details about each <span className="text-green">project</span>.
        </p>

        <div className="PORTFOLIO__area" >
          <div className="PORTFOLIO__menu">
            <ul>
              <li className="active"><a href="#" data-filter="*">all</a></li>
              {data.category.map((name) => (<PortfolioFilter name={name} />))}
            </ul>
          </div>

          <div className="PORTFOLIO__content">
            <div className="row PORTFOLIO__div">
              {data.items.map((item) => (<PortfolioItem {...item} />))}
            </div>
          </div>
        </div>
      </div>
    </div>    
  </section>
);


export default PortfolioSection;
