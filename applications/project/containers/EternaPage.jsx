import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgEterna = require('../images/pm_eterna.jpg');

const notes = {
  server: (
    <p>
      Brower page
      <span className="label PROJECT__label--red">only</span>
      accessible to <u>community</u>
      (requires <span className="label PROJECT__label--blue">login</span>).
    </p>
  ),
  demo: (
    <p>
      Prototype with
      <span className="label PROJECT__label--green">static</span>
      data for <u>public</u> view.
    </p>
  ),
};


const EternaPage = ({
  title,
  description,
  urls,
  carousels,
  lists,
}) => {
  if (!title) { return null; }

  return (
    <div className="PROJECT__body">
      <TitleSection
        title={title}
        description={description}
        image={imgEterna}
      />
      <AccessSection
        key="top"
        urls={urls}
        notes={notes}
      />
      <FeatureSection
        project="eterna"
        carousels={carousels}
        lists={lists}
      />
      <AccessSection
        key="bottom"
        urls={urls}
        notes={notes}
      />
    </div>
  );
};

EternaPage.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  urls: React.PropTypes.shape({
    server: React.PropTypes.string,
    demo: React.PropTypes.string,
  }),
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
};
EternaPage.defaultProps = {
  title: '',
  description: '',
  urls: {
    server: '',
    demo: '',
  },
  carousels: [],
  lists: [],
};


const mapStateToProps = state => (state.eterna);
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EternaPage);
