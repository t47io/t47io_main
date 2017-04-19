import React from 'react';
import { connect } from 'react-redux';

import FeatureSection from '../components/FeatureSection.jsx';
import Headline from '../components/Headline.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgDaslab = require('../images/pm_daslab.jpg');


const DaslabPage = ({
  project,
  title,
  description,
  carousels,
  lists,
  subtitles,
}) => {
  if (!title || carousels.length !== 5 || lists.length !== 5) {
    return null;
  }

  return (
    <div className="PROJECT__body">
      <TitleSection
        title={title}
        description={description}
        image={imgDaslab}
      />
      <FeatureSection
        project={project}
        title={subtitles.feature.title}
        icon={subtitles.feature.icon}
        carousels={carousels}
        lists={lists}
      />
      {/* <Headline
            title={subtitles.access.title}
            icon={subtitles.access.icon}
          />
      */}
    </div>
  );
};

DaslabPage.propTypes = {
  project: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  subtitles: React.PropTypes.shape({
    story: React.PropTypes.shape({
      title: React.PropTypes.string,
      icon: React.PropTypes.string,
    }),
  }),
};
DaslabPage.defaultProps = {
  project: '',
  title: '',
  description: '',
  carousels: [],
  lists: [],
  subtitles: {
    story: {
      title: '',
      icon: '',
    },
  },
};


const mapStateToProps = state => ({
  ...state.daslab,
  subtitles: state.subtitles,
});
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaslabPage);
