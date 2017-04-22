import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgPrimerize = require('../images/pm_primerize.jpg');


const PrimerizePage = ({
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
        image={imgPrimerize}
      />
      <AccessSection
        key="top"
        repoUrl={urls.repo}
        serverUrl={urls.server}
      />
      <FeatureSection
        project="primerize"
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
