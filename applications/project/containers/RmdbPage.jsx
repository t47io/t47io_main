import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgRmdb = require('../images/pm_rmdb.jpg');


const RmdbPage = ({
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
        image={imgRmdb}
      />
      <AccessSection
        key="top"
        urls={urls}
      />
      <FeatureSection
        project="rmdb"
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
};


const mapStateToProps = state => (state.rmdb);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RmdbPage);
