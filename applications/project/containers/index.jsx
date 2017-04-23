import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Location,
  Locations,
} from 'react-router-component';
import ReactTooltip from 'react-tooltip';

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

    <Locations
      className="container"
      onBeforeNavigation={(path, navigation, match) => {
        console.error(path, navigation, match);
        return true;
      }}
      onNavigation={(path, navigation, match) => {
        console.error(path, navigation, match);
      }}
    >
      <Location path="/project/daslab" handler={DaslabPage} />
      <Location path="/project/primerize" handler={PrimerizePage} />
      <Location path="/project/rmdb" handler={RmdbPage} />
      <Location path="/project/eterna" handler={EternaPage} />
      <Location path="/project/hitrace" handler={HitracePage} />
      <Location path="/project/spindle" handler={SpindlePage} />
      <Location path="/project/ribokit" handler={RibokitPage} />
      <Location path="/project/celica" handler={CelicaPage} />
    </Locations>

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
