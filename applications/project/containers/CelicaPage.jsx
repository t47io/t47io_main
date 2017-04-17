import React from 'react';
import { connect } from 'react-redux';

import Carousel from '../components/Carousel.jsx';
import FeatureList from '../components/FeatureList.jsx';
import PageTitle from '../components/PageTitle.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const imgCelica = require('../images/pm_celica.jpg');


const CelicaPage = ({
  project,
  title,
  description,
  carousels,
  lists,
  subtitles,
}) => {
  if (!title || carousels.length !== 3 || lists.length !== 3) {
    return null;
  }

  return (
    <div className="PROJECT__body">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
          <PageTitle
            title={title}
            description={description}
            image={imgCelica}
          />
          <SectionTitle
            title={subtitles.story.title}
            icon={subtitles.story.icon}
          />
          <br />
        </div>
      </div>
      <div className="row">
        <Carousel
          items={carousels[0]}
          index={1}
          project={project}
        />
        <FeatureList {...lists[0]} />
      </div>
      <div className="row">
        <FeatureList {...lists[1]} />
        <Carousel
          items={carousels[1]}
          index={2}
          project={project}
        />
      </div>
      <div className="row">
        <Carousel
          items={carousels[2]}
          index={3}
          project={project}
        />
        <FeatureList {...lists[2]} />
      </div>
    </div>
  );
};

CelicaPage.propTypes = {
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
CelicaPage.defaultProps = {
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
  ...state.celica,
  subtitles: state.subtitles,
});


export default connect(
  mapStateToProps,
  null,
)(CelicaPage);
