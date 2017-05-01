import React from 'react';

import Carousel from './Carousel.jsx';
import FeatureList from './FeatureList.jsx';
import Headline from './Headline.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import '../stylesheets/FeatureSection.scss';


const FeatureSection = ({
  project,
  carousels,
  lists,
  isStory,
  isRow,
  onScroll,
}) => {
  const title = isStory ? 'Journey & Story' : 'Features';
  const icon = isStory ? 'newspaper' : 'right-hand';
  const colClassName = isRow ? {} : {
    className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
  };

  return (
    <div>
      <div className="row">
        <hr />
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
          <Headline
            title={title}
            icon={icon}
          />
          <Trigger
            delay={0}
            onToggleAnimation={onScroll}
          />
        </div>
      </div>
      {Array(...Array(carousels.length)).map((_, i) => (
        <div className="row">
          {(i % 2 === 1 || !isRow) && (
            <FeatureList
              {...lists[i]}
              {...colClassName}
            />
          )}
          <Carousel
            items={carousels[i]}
            index={i + 1}
            project={project}
            {...colClassName}
          />
          {(i % 2 === 0 && isRow) && (
            <FeatureList
              {...lists[i]}
              {...colClassName}
            />
          )}
        </div>
      ))}
      {!isRow && (
        <FeatureList
          {...lists[carousels.length]}
          {...colClassName}
        />
      )}
    </div>
  );
};

FeatureSection.propTypes = {
  project: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  isStory: React.PropTypes.bool,
  isRow: React.PropTypes.bool,
  onScroll: React.PropTypes.func,
};
FeatureSection.defaultProps = {
  project: '',
  carousels: [],
  lists: [],
  isStory: false,
  isRow: true,
  onScroll: () => {},
};


export default FeatureSection;
