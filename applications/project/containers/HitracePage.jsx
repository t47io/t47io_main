import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccessSection from '../components/AccessSection.jsx';
import DocsSection from '../components/DocsSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import GithubSection from '../components/GithubSection.jsx';
import MetaSection from '../components/MetaSection.jsx';
import TitleSection from '../components/TitleSection.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import { imgHitrace } from '../components/Images.js';
import { aniamteScrollTop } from '../actions/dataActions.js';
import { HITRACE } from '../constants/projectTypes.js';


const HitracePage = ({
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
        project={HITRACE}
      />
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
          project={HITRACE}
          carousels={carousels}
          lists={lists}
          isRow={false}
          onScroll={onScroll}
        />
      </TitleSection>

      <Trigger
        delay={0}
        onToggleAnimation={onScroll}
      />
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
  onScroll: React.PropTypes.func,
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
  onScroll: () => {},
};


const mapStateToProps = state => (state.project[HITRACE]);
const mapDispatchToProps = dispatch => ({
  onScroll: bindActionCreators(aniamteScrollTop, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HitracePage);
