import React from 'react';
import PropTypes from 'prop-types';

import RepositoryCharts from './RepositoryCharts.jsx';
import RepositoryStats from './RepositoryStats.jsx';


const Repository = ({
  basics,
  authors,
  contributions,
}) => {
  if (!basics.name) { return null; }

  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <RepositoryStats
          basics={basics}
          contributors={authors}
        />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <RepositoryCharts {...contributions} />
      </div>
    </div>
  );
};

Repository.propTypes = {
  basics: PropTypes.object,
  authors: PropTypes.arrayOf(PropTypes.object),
  contributions: PropTypes.shape({
    additions: PropTypes.arrayOf(PropTypes.number),
    deletions: PropTypes.arrayOf(PropTypes.number),
    commits: PropTypes.arrayOf(PropTypes.number),
    months: PropTypes.arrayOf(PropTypes.string),
  }),
};
Repository.defaultProps = {
  basics: {},
  authors: [],
  contributions: {
    additions: [],
    deletions: [],
    commits: [],
    months: [],
  },
};


export default Repository;
