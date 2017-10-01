import React from 'react';
import PropTypes from 'prop-types';

import PortfolioDescription from './PortfolioDescription.jsx';
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
          className="PORTFILIO__text-link"
          href={url || `/project/${name}`}
          target="_blank" rel="noopener noreferrer"
        >
          {title}
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        <PortfolioDescription description={description} />
      </div>
    </WebAnimation>
  </div>
);

PortfolioItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
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
