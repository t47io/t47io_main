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

import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';

import { scrollToSection } from '../../common/actions/navbarActions.js';

import '../stylesheets/index.scss';


const Project = ({
  onScrollTop,
}) => (
  <div id="HOME__section">
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

Project.propTypes = {
  onScrollTop: React.PropTypes.func,
};
Project.defaultProps = {
  onScrollTop: () => {},
};


const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  onScrollTop: bindActionCreators(scrollToSection, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
