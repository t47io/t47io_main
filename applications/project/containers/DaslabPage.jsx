import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import { daslabNotes } from '../components/AccessNotes.jsx';
import { imgDaslab } from '../components/Images.js';
import { DASLAB } from '../constants/projectTypes.js';


const DaslabPage = ({
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
      />
      <GithubSection />
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
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  urls: React.PropTypes.shape({
    repo: React.PropTypes.string,
    server: React.PropTypes.string,
    demo: React.PropTypes.string,
  }),
  docs: React.PropTypes.arrayOf(React.PropTypes.string),
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
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
};


const mapStateToProps = state => (state.project[DASLAB]);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaslabPage);
