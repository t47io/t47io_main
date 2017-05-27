import React from 'react';

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
  basics: React.PropTypes.object,
  contributors: React.PropTypes.arrayOf(React.PropTypes.object),
};
RepositoryStats.defaultProps = {
  basics: {},
  contributors: [],
};


export default RepositoryStats;
