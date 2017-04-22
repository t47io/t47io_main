import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';
import Headline from '../components/Headline.jsx';

const imgPrimerize = require('../images/pm_primerize.jpg');

const featureLength = 3;


const PrimerizePage = ({
  project,
  title,
  description,
  urls,
  docs,
  carousels,
  lists,
}) => {
  if (!title || carousels.length !== featureLength || lists.length !== featureLength) {
    return null;
  }

  return (
    <div className="PROJECT__body">
      <TitleSection
        title={title}
        description={description}
        image={imgPrimerize}
      />
      <AccessSection
        key="top"
        repoUrl={urls.repo}
        serverUrl={urls.server}
      />
      <FeatureSection
        project={project}
        carousels={carousels}
        lists={lists}
      />
      <GithubSection />
      <DocsSection
        labels={docs}
        urls={[urls.manual, `${urls.repo}wiki/`]}
      />
      <AccessSection
        key="bottom"
        repoUrl={urls.repo}
        serverUrl={urls.server}
      />
    </div>
  );
};

PrimerizePage.propTypes = {
  project: React.PropTypes.string,
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
};
PrimerizePage.defaultProps = {
  project: '',
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
};


const mapStateToProps = state => (state.primerize);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimerizePage);
