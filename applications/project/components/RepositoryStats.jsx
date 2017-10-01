import React from 'react';
import PropTypes from 'prop-types';

import RepositoryBasic from './RepositoryBasic.jsx';
import RepositoryTable from './RepositoryTable.jsx';


const RepositoryStats = ({
  basics,
  contributors,
}) => (
  <div key={`${basics.name}`}>
    <RepositoryBasic {...basics} />
    <br />
    <RepositoryTable items={contributors} />
  </div>
);

RepositoryStats.propTypes = {
  basics: PropTypes.object,
  contributors: PropTypes.arrayOf(PropTypes.object),
};
RepositoryStats.defaultProps = {
  basics: {},
  contributors: [],
};


export default RepositoryStats;
