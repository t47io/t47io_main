import React from 'react';
import PropTypes from 'prop-types';


const RepositoryTableItem = ({
  author,
  commits,
  additions,
  deletions,
}) => (
  <tr>
    <td className="PROJECT__repo-table-author">{author}</td>
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
  author: PropTypes.string,
  commits: PropTypes.number,
  additions: PropTypes.number,
  deletions: PropTypes.number,
};
RepositoryTableItem.defaultProps = {
  author: '',
  commits: 0,
  additions: 0,
  deletions: 0,
};


export default RepositoryTableItem;
