import React from 'react';

import Carousel from './Carousel.jsx';
import FeatureList from './FeatureList.jsx';
import Headline from './Headline.jsx';

import '../stylesheets/FeatureSection.scss';


const FeatureSection = ({
  project,
  carousels,
  lists,
  isStory,
}) => {
  const title = isStory ? 'Journey & Story' : 'Features';
  const icon = isStory ? 'newspaper' : 'right-hand';

  return (
    <div>
      <div className="row">
        <hr />
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
};

FeatureSection.propTypes = {
  project: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  isStory: React.PropTypes.bool,
};
FeatureSection.defaultProps = {
  project: '',
  carousels: [],
  lists: [],
  isStory: false,
};


export default FeatureSection;
