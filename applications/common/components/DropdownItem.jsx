import React from 'react';
import { Link } from 'preact-router/match';
import PropTypes from 'prop-types';


const DropdownItem = ({ title }) => (
  <li className="COMMON__dropdown-item">
    <Link
      href={`/project/${title}`}
      className="COMMON__dropdown-link"
      activeClassName="active"
    >
      {title}
    </Link>
  </li>
);

DropdownItem.propTypes = {
  title: PropTypes.string,
};
DropdownItem.defaultProps = {
  title: '',
};


export default DropdownItem;
