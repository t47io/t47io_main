import React from 'react';
import Animation from '../../common/components/Animation.jsx';


const PortfolioFilterItem = ({
  category = '',
  selectedCategory = 'all',
  shouldAnimate = true,
  onClick = () => {},
}) => {
  const activeClassName = (category === selectedCategory) ? 'active' : '';

  return (
    <Animation
      tagName="li"
      className={`PORTFOLIO__filter ${activeClassName}`}
      shouldAnimate={shouldAnimate}
      propsForceUpdate={activeClassName}
    >
      <a onClick={onClick}>
        {category.replace(/-/g, ' ')}
      </a>
    </Animation>
  );
};

PortfolioFilterItem.propTypes = {
  category: React.PropTypes.string,
  selectedCategory: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};


export default PortfolioFilterItem;
