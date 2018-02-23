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

import { imgPrimerize } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { getPageProps } from '../util.js';
import { noOp } from '../../common/util.js';
import { PRIMERIZE } from '../constants/projectTypes.js';


const PrimerizePage = ({
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
        project={PRIMERIZE}
      />
      <TitleSection
        title={title}
        description={description}
        image={imgPrimerize}
      />
      <AccessSection
        key="top"
        urls={urls}
      />
      <FeatureSection
        project={PRIMERIZE}
        carousels={carousels}
        lists={lists}
        onScroll={onScroll}
      />
      <GithubSection repos={repos} />
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

PrimerizePage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urls: PropTypes.shape({
    repo: PropTypes.string,
    server: PropTypes.string,
    manual: PropTypes.string,
  }),
  docs: PropTypes.arrayOf(PropTypes.string),
  carousels: PropTypes.arrayOf(PropTypes.array),
  lists: PropTypes.arrayOf(PropTypes.object),
  repos: PropTypes.arrayOf(PropTypes.object),
  onScroll: PropTypes.func,
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
  repos: [],
  onScroll: noOp,
};


const mapStateToProps = state => getPageProps(state, PRIMERIZE);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimerizePage);
