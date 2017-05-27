import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgRibokit } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { RIBOKIT } from '../constants/projectTypes.js';


const RibokitPage = ({
  title,
  description,
  urls,
  docs,
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
      <GithubSection />
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
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  urls: React.PropTypes.shape({
    server: React.PropTypes.arrayOf(React.PropTypes.string),
    theme: React.PropTypes.arrayOf(React.PropTypes.string),
    manual: React.PropTypes.string,
  }),
  docs: React.PropTypes.arrayOf(React.PropTypes.string),
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  onScroll: React.PropTypes.func,
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
  onScroll: () => {},
};


const mapStateToProps = state => (state.project ? state.project[RIBOKIT] : {});
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RibokitPage);
