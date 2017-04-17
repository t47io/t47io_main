import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Locations, Location } from 'react-router-component';
import ReactTooltip from 'react-tooltip';

import CelicaPage from './CelicaPage.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';

import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';

import { scrollToSection } from '../../common/actions/navbarActions.js';

import '../stylesheets/index.scss';


const Project = ({
  celica,
  _subtitles,
  onScrollTop,
}) => (
  <div>
    <Navbar />

    <Locations>
      <Location
        path="/project/celica"
        handler={CelicaPage}
        {...celica}
        subtitles={_subtitles}
        project="celica"
      />
    </Locations>

    <ReactTooltip effect="solid" place="top" id="PROJECT__tooltip" />
    <ScrollTop
      isHidden={false}
      onScrollTop={onScrollTop}
    />
    <Footer />
  </div>
);

Project.propTypes = {
};
Project.defaultProps = {
};


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onScrollTop: bindActionCreators(scrollToSection, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
