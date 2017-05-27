import React from 'react';


const RepositoryTableItem = ({
  author,
  commits,
  additions,
  deletions,
}) => (
  <tr>
    <td className="PROECT__repo-table-author">{author}</td>
    <td className="PROJECT__repo-table-number PROJECT__number--cyan">
      <span className="pull-right">{commits}</span>
    </td>
    <td className="PROJECT__repo-table-number PROJECT__number--green">
      <span className="pull-right">{additions}</span>
    </td>
    <td className="PROJECT__repo-table-number PROJECT__number--red">
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
