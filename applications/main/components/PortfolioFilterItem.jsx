import React from 'react';
import Animation from '../../common/components/Animation.jsx';


const PortfolioFilterItem = ({
  name = '',
  filter = '',
  shouldAnimate = true,
  onClick = () => {},
}) => (
  <Animation
    tagName="li"
    className={`PORTFOLIO__filter ${(name === filter) ? 'active' : ''}`}
    shouldAnimate={shouldAnimate}
  >
    <a data-filter={name} onClick={onClick}>
      {name.replace(/-/g, ' ')}
    </a>
  </Animation>
);

PortfolioFilterItem.propTypes = {
  name: React.PropTypes.string,
  filter: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};


export default PortfolioFilterItem;
