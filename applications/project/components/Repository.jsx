import React from 'react';

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
  basics: React.PropTypes.object,
  contributors: React.PropTypes.arrayOf(React.PropTypes.object),
  additions: React.PropTypes.arrayOf(React.PropTypes.number),
  deletions: React.PropTypes.arrayOf(React.PropTypes.number),
  commits: React.PropTypes.arrayOf(React.PropTypes.number),
  months: React.PropTypes.arrayOf(React.PropTypes.string),
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
