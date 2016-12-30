import React from 'react';
// import Shuffle from 'shufflejs';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {portfolio as tween} from '../js/tweens.js';


const PortfolioFilter = ({name, index}) => (
  <SparkScroll.li className={name == "all" ? "active" : ""}
  proxy="PORTFOLIO__menu"
  timeline={tween.menu(index*20)} >
    <a href="#" data-filter={name} >{name.replace(/\-/g, ' ')}</a>
  </SparkScroll.li>
);

const PortfolioItem = ({name, category, description, title, url, index}) => (
  <SparkProxy.div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 PORTFOLIO__entry" proxyId={`PORTFOLIO__proxy_${index}`} >
    <SparkScroll.div className="PORTFOLIO__item"
      data-groups={category}
      proxy={`PORTFOLIO__proxy_${index}`}
      timeline={tween.thumbnail} >
      <div className="sprite"><div className={`thumb_${name}`} ></div></div>
      <div className="PORTFOLIO__text">
        <a href={url ? url : `/project/${name}`} target="_blank" rel="noopener">{title} <i className="fa fa-fw fa-md fa-external-link"></i></a>
        <span dangerouslySetInnerHTML={{__html: description}} ></span>
      </div>
    </SparkScroll.div>
  </SparkProxy.div>
);

const PortfolioSection = ({items, category}) => (
  <section id="PORTFOLIO__section">
    <div className="row PORTFOLIO__trigger">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <SparkProxy.div className="container" proxyId="PORTFOLIO__header">
          <SparkScroll.div className="page-header text-center PORTFOLIO__header"
            proxy="PORTFOLIO__header"
            timeline={tween.header} >
            <h2>My Works</h2>
            <div className="divider"></div>
            <p className="subtitle">what I am proud of</p>
          </SparkScroll.div>
        </SparkProxy.div>

        <p className="text-gray text-center">
          <span className="fa-stack">
            <i className="fa fa-fw fa-square fa-stack-2x text-light-green"></i>
            <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white"></i>
          </span>
          Click for more details about each <span className="text-green">project</span>.
        </p>

        <div className="PORTFOLIO__area" >
          <div className="PORTFOLIO__menu">
            <SparkProxy.ul proxyId="PORTFOLIO__menu">
              {category.map((name, i) => (<PortfolioFilter name={name} index={i} />))}
            </SparkProxy.ul>
          </div>

          <div className="PORTFOLIO__content">
            <div className="PORTFOLIO__div">
              {items.map((item, i) => (<PortfolioItem {...item} index={i} />))}
            </div>
          </div>
        </div>
      </div>
    </div>    
  </section>
);


export default PortfolioSection;
