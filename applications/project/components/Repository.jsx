import React from 'react';

import RepositoryCharts from './RepositoryCharts.jsx';
import RepositoryStats from './RepositoryStats.jsx';


const Repository = ({
  basics,
  contributors,
}) => {
  if (!basics.name) { return null; }

  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <RepositoryStats
          basics={basics}
          contributors={contributors}
        />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <RepositoryCharts />
      </div>
    </div>
  );
};

Repository.propTypes = {
  basics: React.PropTypes.object,
  contributors: React.PropTypes.arrayOf(React.PropTypes.object),

};
Repository.defaultProps = {
  basics: {},
  contributors: [],

};


export default Repository;
