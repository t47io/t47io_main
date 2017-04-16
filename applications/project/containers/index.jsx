import React from 'react';
import { Locations, Location } from 'react-router-component';
import { connect } from 'react-redux';

import CelicaPage from './CelicaPage.jsx';

import '../stylesheets/index.scss';


const Project = (props) => {
  console.error(props);

  return (
    <Locations>
      <Location
        path="/project/celica"
        handler={CelicaPage}
        {...props.celica}
        subtitles={props._subtitles}
        project="celica"
      />
    </Locations>
  );
};

Project.propTypes = {
};
Project.defaultProps = {
};


const mapStateToProps = state => state;
const mapDispatchToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
