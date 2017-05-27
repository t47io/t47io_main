import React from 'react';

import RepositoryTableItem from './RepositoryTableItem.jsx';


const RepositoryTable = ({ items }) => (
  <table className="table table-hover">
    <thead>
      <tr className="active">
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-user" />
          Account
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-angle-circled-up" />
          Commits
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-plus-circled" />
          Additions
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-minus-circled" />
          Deletions
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <RepositoryTableItem
          {...item}
          key={`${item.author}-${item.additions}_${item.deletions}`}
        />
      ))}
      <tr>
        <td colSpan="4" style={{ padding: 0 }} />
      </tr>
    </tbody>
  </table>
);

RepositoryTable.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
};
RepositoryTable.defaultProps = {
  items: [],
};


export default RepositoryTable;
