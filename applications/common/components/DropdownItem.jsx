import React from 'react';
import { Link } from 'preact-router/match';
import PropTypes from 'prop-types';

import cssDrop from '../stylesheets/Dropdown.scss';


const DropdownItem = ({ title }) => (
  <li styleName="cssDrop.COMMON__dropdown-item">
    <Link
      href={`/project/${title}`}
      styleName="cssDrop.COMMON__dropdown-link"
      activeClassName={cssDrop.active}
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
