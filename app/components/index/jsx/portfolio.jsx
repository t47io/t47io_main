import React from 'react';
import SectionHeader from '../../common/jsx/header.jsx';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {portfolio as tween} from '../js/tweens.js';


const PortfolioFilter = ({name, filter, onClick, index}) => (
  <SparkScroll.li className={name === filter ? "active" : ""}
  proxy="PORTFOLIO__menu"
  timeline={tween.menu(index*20)} >
    <a href="#" data-filter={name} onClick={onClick} >{name.replace(/\-/g, ' ')}</a>
  </SparkScroll.li>
);

const PortfolioItem = ({name, category, description, title, url, index}) => (
  <SparkProxy.div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 PORTFOLIO__entry" proxyId={`PORTFOLIO__proxy_${index}`} >
    <SparkScroll.div className="PORTFOLIO__item"
      proxy={`PORTFOLIO__proxy_${index}`}
      data-category={category}
      timeline={tween.thumbnail} >
      <div className="SPRITE">
        <div className={`SPRITE__portfolio-${name}`} ></div>
      </div>
      <div className="PORTFOLIO__text">
        <a href={url ? url : `/project/${name}`} target="_blank" rel="noopener">{title} <i className="fa fa-fw fa-md fa-external-link"></i></a>
        <span dangerouslySetInnerHTML={{__html: description}} ></span>
      </div>
    </SparkScroll.div>
  </SparkProxy.div>
);

class PortfolioSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      filter: 'all'
    };
  }

  onFilter(e) {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    const items = (filter === 'all') ? this.props.items : this.props.items.filter((item) => (item.category === filter));
    this.setState({
      items,
      filter
    });
  }

  render() {
    const {category} = this.props, {filter, items} = this.state;
    return (
      <section id="PORTFOLIO__section">
        <div className="PORTFOLIO__trigger">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0px">
            <SectionHeader title="my works" subtitle="what I am proud of" proxyId="PORTFOLIO__header" tween={tween.header} />

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
                  {category.map((name, i) => (<PortfolioFilter name={name} index={i} filter={filter} onClick={this.onFilter.bind(this)} />))}
                </SparkProxy.ul>
              </div>

              <div className="PORTFOLIO__content">
                <div className="PORTFOLIO__div">
                  {items.map((item, i) => (<PortfolioItem {...item} index={i} key={item.name} />))}
                </div>
              </div>
            </div>
          </div>
        </div>    
      </section>
    );
  }
}


export default PortfolioSection;
