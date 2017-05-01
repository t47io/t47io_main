import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgRmdb } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { RMDB } from '../constants/projectTypes.js';


const RmdbPage = ({
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
        project={RMDB}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgRmdb}
      />
      <AccessSection
        key="top"
        urls={urls}
      />
      <FeatureSection
        project={RMDB}
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <GithubSection />
      <DocsSection
        labels={docs}
        urls={[urls.manual, `${urls.repo}wiki/`]}
      />
      <AccessSection
        key="bottom"
        urls={urls}
      />
    </div>
  );
};

RmdbPage.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  urls: React.PropTypes.shape({
    repo: React.PropTypes.string,
    server: React.PropTypes.string,
    manual: React.PropTypes.string,
  }),
  docs: React.PropTypes.arrayOf(React.PropTypes.string),
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
  onScroll: React.PropTypes.func,
};
RmdbPage.defaultProps = {
  title: '',
  description: '',
  urls: {
    repo: '',
    server: '',
    manual: '',
  },
  docs: [],
  carousels: [],
  lists: [],
  onScroll: () => {},
};


const mapStateToProps = state => (state.project[RMDB]);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RmdbPage);
