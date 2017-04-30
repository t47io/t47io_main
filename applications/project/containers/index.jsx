import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';
import {
  Route,
  Router,
} from 'preact-router';

import DaslabPage from './DaslabPage.jsx';
import PrimerizePage from './PrimerizePage.jsx';
import RmdbPage from './RmdbPage.jsx';
import EternaPage from './EternaPage.jsx';
import HitracePage from './HitracePage.jsx';
import SpindlePage from './SpindlePage.jsx';
import RibokitPage from './RibokitPage.jsx';
import CelicaPage from './CelicaPage.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';

import Meta from '../components/Meta.jsx';
import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';

import { scrollToSection } from '../../common/actions/navbarActions.js';
import { animateReady } from '../actions/dataActions.js';

import '../stylesheets/index.scss';


const Project = ({
  data: {
    project,
    repository,
    ready,
  },
  actions: {
    onReady,
    onScrollTop,
  },
}) => {
  if (project && repository && !ready) { onReady(); }

  return (
    <div id="HOME__section">
      <Meta />
      <Navbar />

      <div className="container">
        <Router>
          <Route component={DaslabPage} path="/project/daslab" />
          <Route component={PrimerizePage} path="/project/primerize" />
          <Route component={RmdbPage} path="/project/rmdb" />
          <Route component={EternaPage} path="/project/eterna" />
          <Route component={HitracePage} path="/project/hitrace" />
          <Route component={SpindlePage} path="/project/spindle" />
          <Route component={RibokitPage} path="/project/ribokit" />
          <Route component={CelicaPage} path="/project/celica" />
        </Router>
      </div>

      <ReactTooltip effect="solid" place="top" id="PROJECT__tooltip" />
      <ScrollTop
        isHidden={false}
        onScrollTop={onScrollTop}
      />
      <hr />
      <Footer disabled />
    </div>
  );
};

Project.propTypes = {
  data: React.PropTypes.shape({
    project: React.PropTypes.bool,
    repository: React.PropTypes.bool,
    ready: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    onReady: React.PropTypes.func,
    onScrollTop: React.PropTypes.func,
  }),
};
Project.defaultProps = {
  data: {
    project: false,
    repository: false,
    ready: false,
  },
  actions: {
    onReady: () => {},
    onScrollTop: () => {},
  },
};


const mapStateToProps = state => ({ data: state.data });
const mapDispatchToProps = dispatch => ({
  actions: {
    onReady: bindActionCreators(animateReady, dispatch),
    onScrollTop: bindActionCreators(scrollToSection, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
