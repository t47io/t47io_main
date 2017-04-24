import React from 'react';
import { connect } from 'react-redux';

import FeatureSection from '../components/FeatureSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgCelica } from '../components/Images.js';
import { CELICA } from '../constants/projectTypes.js';


const CelicaPage = ({
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
        project={CELICA}
        carousels={carousels}
        lists={lists}
        isStory
      />
    </div>
  );
};

CelicaPage.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
};
CelicaPage.defaultProps = {
  title: '',
  description: '',
  carousels: [],
  lists: [],
};


const mapStateToProps = state => (state.project[CELICA]);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelicaPage);
