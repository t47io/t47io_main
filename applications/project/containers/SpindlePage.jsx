import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AccessSection from '../components/AccessSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgSpindle } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { SPINDLE } from '../constants/projectTypes.js';


const SpindlePage = ({
  title,
  description,
  urls,
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
        project={SPINDLE}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgSpindle}
      />
      <AccessSection
        key="top"
        urls={urls}
      />
      <FeatureSection
        project={SPINDLE}
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <AccessSection
        key="bottom"
        urls={urls}
      />
    </div>
  );
};

SpindlePage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urls: PropTypes.shape({
    repo: PropTypes.string,
  }),
  carousels: PropTypes.arrayOf(PropTypes.array),
  lists: PropTypes.arrayOf(PropTypes.object),
  onScroll: PropTypes.func,
};
SpindlePage.defaultProps = {
  title: '',
  description: '',
  urls: {
    repo: '',
  },
  carousels: [],
  lists: [],
  onScroll: () => {},
};


const mapStateToProps = state => getPageProps(state, SPINDLE);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpindlePage);
