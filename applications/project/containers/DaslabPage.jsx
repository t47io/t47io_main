import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgDaslab = require('../images/pm_daslab.jpg');

const featureLength = 5;
const serverNote = (
  <p>
    Internal Site
    <span className="label PROJECT__label--red">not</span>
    accessible to <u>public</u>
    (<span className="label PROJECT__label--blue">WebAuth</span> gated).
  </p>
);
const demoNote = (
  <p>
    Internal Site with
    <span className="label PROJECT__label--green">mock-up</span>
    data for <u>public</u> view.
  </p>
);


const DaslabPage = ({
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
        image={imgDaslab}
      />
      <AccessSection
        key="top"
        repoUrl={urls.repo}
        serverUrl={urls.server}
        demoUrl={urls.demo}
        serverNote={serverNote}
        demoNote={demoNote}
      />
      <FeatureSection
        project={project}
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
        repoUrl={urls.repo}
        serverUrl={urls.server}
        demoUrl={urls.demo}
        serverNote={serverNote}
        demoNote={demoNote}
      />
    </div>
  );
};

DaslabPage.propTypes = {
  project: React.PropTypes.string,
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
  project: '',
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


const mapStateToProps = state => (state.daslab);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaslabPage);
