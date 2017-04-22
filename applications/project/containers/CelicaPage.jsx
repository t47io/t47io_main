import React from 'react';
import { connect } from 'react-redux';

import FeatureSection from '../components/FeatureSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgCelica = require('../images/pm_celica.jpg');


const CelicaPage = ({
  project,
  title,
  description,
  carousels,
  lists,
}) => {
  if (!title) { return null; }

  return (
    <div className="PROJECT__body">
      <TitleSection
        title={title}
        description={description}
        image={imgCelica}
      />
      <FeatureSection
        project={project}
        carousels={carousels}
        lists={lists}
        isStory
      />
    </div>
  );
};

CelicaPage.propTypes = {
  project: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
};
CelicaPage.defaultProps = {
  project: '',
  title: '',
  description: '',
  carousels: [],
  lists: [],
};


const mapStateToProps = state => (state.celica);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelicaPage);
