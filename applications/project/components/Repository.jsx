import React from 'react';
import PropTypes from 'prop-types';

import RepositoryCharts from './RepositoryCharts.jsx';
import RepositoryStats from './RepositoryStats.jsx';


const Repository = ({
  basics,
  contributors,
  additions,
  deletions,
  commits,
  months,
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
        <RepositoryCharts
          additions={additions}
          deletions={deletions}
          commits={commits}
          months={months}
        />
      </div>
    </div>
  );
};

Repository.propTypes = {
  basics: PropTypes.object,
  contributors: PropTypes.arrayOf(PropTypes.object),
  additions: PropTypes.arrayOf(PropTypes.number),
  deletions: PropTypes.arrayOf(PropTypes.number),
  commits: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.arrayOf(PropTypes.string),
};
Repository.defaultProps = {
  basics: {},
  contributors: [],
  additions: [],
  deletions: [],
  commits: [],
  months: [],
};


export default Repository;
