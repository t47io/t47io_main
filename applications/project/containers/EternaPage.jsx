import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AccessSection from '../components/AccessSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { eternaNotes } from '../components/AccessNotes.jsx';
import { imgEterna } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { ETERNA } from '../constants/projectTypes.js';


const EternaPage = ({
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
        project={ETERNA}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgEterna}
      />
      <AccessSection
        key="top"
        urls={urls}
        notes={eternaNotes}
      />
      <FeatureSection
        project={ETERNA}
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <AccessSection
        key="bottom"
        urls={urls}
        notes={eternaNotes}
      />
    </div>
  );
};

EternaPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urls: PropTypes.shape({
    server: PropTypes.string,
    demo: PropTypes.string,
  }),
  carousels: PropTypes.arrayOf(PropTypes.array),
  lists: PropTypes.arrayOf(PropTypes.object),
  onScroll: PropTypes.func,
};
EternaPage.defaultProps = {
  title: '',
  description: '',
  urls: {
    server: '',
    demo: '',
  },
  carousels: [],
  lists: [],
  onScroll: () => {},
};


const mapStateToProps = state => getPageProps(state, ETERNA);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EternaPage);
