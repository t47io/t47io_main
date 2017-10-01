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

import { imgRibokit } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { RIBOKIT } from '../constants/projectTypes.js';


const RibokitPage = ({
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
    <div className="PROJECT__body">
      <MetaSection
        title={title}
        description={description}
        project={RIBOKIT}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgRibokit}
      />
      <AccessSection
        key="top"
        urls={urls}
        isUrlList
      />
      <FeatureSection
        project="ribokit"
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <GithubSection repos={repos} />
      <DocsSection
        labels={docs}
        urls={[urls.manual]}
      />
      <AccessSection
        key="bottom"
        urls={urls}
        isUrlList
      />
    </div>
  );
};

RibokitPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urls: PropTypes.shape({
    server: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.arrayOf(PropTypes.string),
    manual: PropTypes.string,
  }),
  docs: PropTypes.arrayOf(PropTypes.string),
  carousels: PropTypes.arrayOf(PropTypes.array),
  lists: PropTypes.arrayOf(PropTypes.object),
  repos: PropTypes.arrayOf(PropTypes.object),
  onScroll: PropTypes.func,
};
RibokitPage.defaultProps = {
  title: '',
  description: '',
  urls: {
    server: [],
    theme: [],
    manual: '',
  },
  docs: [],
  carousels: [],
  lists: [],
  repos: [],
  onScroll: () => {},
};


const mapStateToProps = state => getPageProps(state, RIBOKIT);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RibokitPage);
