import React from 'react';

import Carousel from '../components/Carousel.jsx';
import FeatureList from '../components/FeatureList.jsx';
import Headline from '../components/Headline.jsx';

import '../stylesheets/FeatureSection.scss';


const FeatureSection = ({
  project,
  title,
  icon,
  carousels,
  lists,
}) => (
  <div>
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
        <Headline
          title={title}
          icon={icon}
        />
      </div>
    </div>
    {Array(...Array(carousels.length)).map((_, i) => (
      <div className="row">
        {(i % 2 === 1) && <FeatureList {...lists[i]} />}
        <Carousel
          items={carousels[i]}
          index={i + 1}
          project={project}
        />
        {(i % 2 === 0) && <FeatureList {...lists[i]} />}
      </div>
    ))}
  </div>
);

FeatureSection.propTypes = {
  project: React.PropTypes.string,
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
};
FeatureSection.defaultProps = {
  project: '',
  title: '',
  icon: '',
  carousels: [],
  lists: [],
};


export default FeatureSection;
