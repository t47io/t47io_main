import React from 'react';

import FeatureListItem from './FeatureListItem.jsx';


const FeatureList = ({
  title,
  icon,
  items,
  links,
  className,
}) => (
  <div className={className}>
    <h3>
      <i className={`fa fa-fw fa-${icon}`} />
      {title}
    </h3>
    <br />
    <ul className="PROJECT__features">
      {items.map((item, i) => (
        <FeatureListItem
          key={`PROJECT__feature-${icon}-${i}`}
          text={item}
          link={links.length ? links[i] : ''}
        />
      ))}
    </ul>
  </div>
);

FeatureList.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.string),
  links: React.PropTypes.arrayOf(React.PropTypes.string),
  className: React.PropTypes.string,
};
FeatureList.defaultProps = {
  title: '',
  icon: '',
  items: [],
  links: [],
  className: 'col-lg-5 col-md-5 col-sm-12 col-xs-12',
};


export default FeatureList;
