import React from 'react';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { portfolioFilterItem } from '../animations/portfolio.js';


const PortfolioFilterItem = ({
  category,
  selectedCategory,
  shouldAnimate,
  index,
  onClick,
}) => {
  const activeClassName = (category === selectedCategory) ? 'active' : '';

  return (
    <WebAnimation
      tagName="li"
      className={`PORTFOLIO__filter ${activeClassName}`}
      keyframes={portfolioFilterItem.keyframes}
      timing={portfolioFilterItem.timing(index)}
      shouldAnimate={shouldAnimate}
      propsForceUpdate={activeClassName}
    >
      <a
        className="PORTFOLIO__filter-link"
        onClick={onClick}
        role="presentation"
      >
        {category.replace(/-/g, ' ')}
      </a>
    </WebAnimation>
  );
};

PortfolioFilterItem.propTypes = {
  category: React.PropTypes.string,
  selectedCategory: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
  onClick: React.PropTypes.func,
};
PortfolioFilterItem.defaultProps = {
  category: '',
  selectedCategory: 'all',
  shouldAnimate: false,
  index: 0,
  onClick: () => {},
};


export default PortfolioFilterItem;
