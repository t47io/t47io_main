import React from 'react';
import { connect } from 'react-redux';

import AccessSection from '../components/AccessSection.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import TitleSection from '../components/TitleSection.jsx';

const imgEterna = require('../images/pm_eterna.jpg');

const featureLength = 2;
const serverNote = (
  <p>
    Brower page
    <span className="label PROJECT__label--red">only</span>
    accessible to <u>community</u>
    (requires <span className="label PROJECT__label--blue">login</span>).
  </p>
);
const demoNote = (
  <p>
    Prototype with
    <span className="label PROJECT__label--green">static</span>
    data for <u>public</u> view.
  </p>
);


const EternaPage = ({
  project,
  title,
  description,
  urls,
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
        image={imgEterna}
      />
      <AccessSection
        key="top"
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
      <AccessSection
        key="bottom"
        serverUrl={urls.server}
        demoUrl={urls.demo}
        serverNote={serverNote}
        demoNote={demoNote}
      />
    </div>
  );
};

EternaPage.propTypes = {
  project: React.PropTypes.string,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  urls: React.PropTypes.shape({
    server: React.PropTypes.string,
    manual: React.PropTypes.string,
  }),
  carousels: React.PropTypes.arrayOf(React.PropTypes.array),
  lists: React.PropTypes.arrayOf(React.PropTypes.object),
};
EternaPage.defaultProps = {
  project: '',
  title: '',
  description: '',
  urls: {
    server: '',
    manual: '',
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
