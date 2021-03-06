import React from 'react';
import PropTypes from 'prop-types';

import RepositoryTableItem from './RepositoryTableItem.jsx';

import '../stylesheets/GitHubSection.scss';


const RepositoryTable = ({ items }) => (
  <table styleName="PROJECT__repo-table" className="table table-hover">
    <thead>
      <tr className="active">
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-user" />
          <span className="hidden-xs">Account</span>
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-angle-circled-up" />
          <span className="hidden-xs">Commits</span>
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-plus-circled" />
          <span className="hidden-xs">Additions</span>
        </th>
        <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <i className="fa fa-fw fa-minus-circled" />
          <span className="hidden-xs">Deletions</span>
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
        <td colSpan="4" styleName="PROJECT__repo-table-bottom" />
      </tr>
    </tbody>
  </table>
);

RepositoryTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
RepositoryTable.defaultProps = {
  items: [],
};


export default RepositoryTable;
