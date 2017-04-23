import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { imgRibokit } from '../components/TitleImages.js';


const RibokitPage = ({
  title,
  description,
  urls,
  docs,
  carousels,
  lists,
}) => {
  if (!title) { return null; }

  return (
    <div className="PROJECT__body">
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
};


const mapStateToProps = state => (state.ribokit);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RibokitPage);
