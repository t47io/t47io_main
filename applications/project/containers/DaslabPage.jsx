import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { daslabNotes } from '../components/AccessNotes.jsx';
import { imgDaslab } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { noOp } from '../../common/util.js';
import { DASLAB } from '../constants/projectTypes.js';


const DaslabPage = ({
  title,
  description,
  urls,
  docs,
  carousels,
  lists,
  repos,
  onScroll,
}) => {
  if (!title) { return null; }

  return (
    <div>
      <MetaSection
        title={title}
        description={description}
        project={DASLAB}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgDaslab}
      />
      <AccessSection
        key="top"
        urls={urls}
        notes={daslabNotes}
      />
      <FeatureSection
        project={DASLAB}
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <GithubSection repos={repos} />
      <DocsSection
        labels={docs}
        urls={[`${urls.repo}wiki/`, `${urls.demo}admin/ref/`]}
        joinWord=", or inside "
      />
      <AccessSection
        key="bottom"
        urls={urls}
        notes={daslabNotes}
      />
    </div>
  );
};

DaslabPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urls: PropTypes.shape({
    repo: PropTypes.string,
    server: PropTypes.string,
    demo: PropTypes.string,
  }),
  docs: PropTypes.arrayOf(PropTypes.string),
  carousels: PropTypes.arrayOf(PropTypes.array),
  lists: PropTypes.arrayOf(PropTypes.object),
  repos: PropTypes.arrayOf(PropTypes.object),
  onScroll: PropTypes.func,
};
DaslabPage.defaultProps = {
  title: '',
  description: '',
  urls: {
    repo: '',
    server: '',
    demo: '',
  },
  docs: [],
  carousels: [],
  lists: [],
  repos: [],
  onScroll: noOp,
};


const mapStateToProps = state => getPageProps(state, DASLAB);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaslabPage);
