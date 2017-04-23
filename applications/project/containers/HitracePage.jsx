import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

import Headline from '../components/Headline.jsx';
import { imgHitrace } from '../components/TitleImages.js';


const HitracePage = ({
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
        image={imgHitrace}
        isSplit
      >
        <AccessSection
          key="bottom"
          urls={urls}
          isRow={false}
        />
        <FeatureSection
          project="hitrace"
          carousels={carousels}
          lists={lists}
          isRow={false}
        />
      </TitleSection>
      <GithubSection />
      <DocsSection
        labels={docs}
        urls={[urls.manual]}
      />
      <AccessSection
        key="bottom"
        urls={urls}
      />
    </div>
  );
};

HitracePage.propTypes = {
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
HitracePage.defaultProps = {
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


const mapStateToProps = state => (state.hitrace);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HitracePage);
