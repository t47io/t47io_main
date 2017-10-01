import React from 'react';
import PropTypes from 'prop-types';

import FeatureListItem from './FeatureListItem.jsx';


const FeatureList = ({
  title,
  icon,
  items,
  links,
  className,
}) => (
  <div className={className}>
    <h3 className="PROJECT__features-title">
      <i className={`fa fa-fw fa-${icon}`} />
      {title}
    </h3>
    <ul className="PROJECT__features lead">
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
  title: PropTypes.string,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};
FeatureList.defaultProps = {
  title: '',
  icon: '',
  items: [],
  links: [],
  className: 'col-lg-5 col-md-5 col-sm-12 col-xs-12',
};


export default FeatureList;
