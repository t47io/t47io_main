import React from 'react';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { portfolioItem } from '../animations/portfolio.js';


const PortfolioItem = ({
  name,
  description,
  title,
  url,
  shouldAnimate,
  index,
}) => (
  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 PORTFOLIO__entry">
    <WebAnimation
      className="PORTFOLIO__item"
      keyframes={portfolioItem.keyframes}
      timing={portfolioItem.timing(index)}
      shouldAnimate={shouldAnimate}
    >
      <div className="SPRITE">
        <div className={`SPRITE__portfolio-${name}`} />
      </div>
      <div className="PORTFOLIO__text">
        <a
          href={url || `/project/${name}`}
          target="_blank" rel="noopener noreferrer"
        >
          {title}
          <i className="fa fa-fw fa-md fa-link-ext" />
        </a>
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </WebAnimation>
  </div>
);

PortfolioItem.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
};
PortfolioItem.defaultProps = {
  name: '',
  description: '',
  title: '',
  url: '',
  shouldAnimate: false,
  index: 0,
};


export default PortfolioItem;
