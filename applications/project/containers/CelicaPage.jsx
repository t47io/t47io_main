import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FeatureSection from '../components/FeatureSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgCelica } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { CELICA } from '../constants/projectTypes.js';


const CelicaPage = ({
  title,
  description,
  carousels,
  lists,
  onScroll,
}) => {
  if (!title) { return null; }

  return (
    <div className="PROJECT__body">
      <MetaSection
        title={title}
        description={description}
        project={CELICA}
      />
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
        onScroll={onScroll}
      />
    </div>
  );
};

CelicaPage.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  onScroll: React.PropTypes.func,
};
CelicaPage.defaultProps = {
  title: '',
  description: '',
  carousels: [],
  lists: [],
  onScroll: () => {},
};


const mapStateToProps = state => getPageProps(state, CELICA);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CelicaPage);
