import React from 'react';


const RepositoryTableItem = ({
  author,
  commits,
  additions,
  deletions,
}) => (
  <tr>
    <td>{author}</td>
    <td>
      <span className="pull-right">{commits}</span>
    </td>
    <td>
      <span className="pull-right">{additions}</span>
    </td>
    <td>
      <span className="pull-right">{deletions}</span>
    </td>
  </tr>
);

RepositoryTableItem.propTypes = {
  author: React.PropTypes.string,
  commits: React.PropTypes.number,
  additions: React.PropTypes.number,
  deletions: React.PropTypes.number,
};
RepositoryTableItem.defaultProps = {
  author: '',
  commits: 0,
  additions: 0,
  deletions: 0,
};


export default RepositoryTableItem;
