import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';
import {
  Route,
  Router,
} from 'preact-router';
import PropTypes from 'prop-types';

import DaslabPage from './DaslabPage.jsx';
import PrimerizePage from './PrimerizePage.jsx';
import RmdbPage from './RmdbPage.jsx';
import EternaPage from './EternaPage.jsx';
import HitracePage from './HitracePage.jsx';
import SpindlePage from './SpindlePage.jsx';
import RibokitPage from './RibokitPage.jsx';
import CelicaPage from './CelicaPage.jsx';

import Meta from '../components/Meta.jsx';
import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';

import { initialState as dataProps } from '../reducers/data.js';
import { scrollToSection } from '../../common/actions/navbarActions.js';
import { animateReady } from '../actions/dataActions.js';

import '../../vendor/index.scss';
import '../stylesheets/index.scss';


const Project = ({
  data: {
    data,
    ready,
    scroll,
  },
  actions: {
    onReady,
    onScrollTop,
  },
}) => {
  if (data && !ready) { onReady(); }
  const sectionClassName = ready ? '' : 'fade';

  return (
    <div
      id="HOME__section"
      className={sectionClassName}
    >
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

      <ReactTooltip
        id="PROJECT__tooltip"
        effect="solid" place="top"
        insecure={false}
      />
      <ScrollTop
        isHidden={!scroll}
        onScrollTop={onScrollTop}
      />
      <hr />
      <Footer disabled />
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.bool,
    ready: PropTypes.bool,
    scroll: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    onReady: PropTypes.func,
    onScrollTop: PropTypes.func,
  }),
};
Project.defaultProps = {
  data: dataProps,
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
