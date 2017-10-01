import React from 'react';
import PropTypes from 'prop-types';

import DropdownItem from './DropdownItem.jsx';
import { PORTFOLIO } from '../../main/constants/sectionTypes.js';


const NavbarItem = ({
  name,
  dropdown,
  isActive,
  onClick,
}) => {
  const isDropdown = (dropdown && dropdown.length > 0);
  const dropdownClassName = isDropdown ? 'dropdown COMMON__dropdown' : '';
  const activeClassName = isActive ? 'active' : '';
  const hrefObj = !isDropdown ? { onClick } : {
    href: (isActive ? `/#${PORTFOLIO}__section` : '/'),
  };

  return (
    <li className={`COMMON__navbar-item ${activeClassName} ${dropdownClassName}`}>
      <a
        className="COMMON__navbar-link"
        {...hrefObj}
      >
        {name}
        {isDropdown && isActive && (
          <span className="caret" />
        )}
      </a>
      {isDropdown && isActive && (
        <ul className="dropdown-menu COMMON__dropdown-menu nav nav-pills nav-stacked">
          {dropdown.map(title => (
            <DropdownItem title={title} />
          ))}
        </ul>
      )}
    </li>
  );
};

NavbarItem.propTypes = {
  name: PropTypes.string,
  dropdown: PropTypes.arrayOf(PropTypes.string),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};
NavbarItem.defaultProps = {
  name: '',
  dropdown: [],
  isActive: false,
  onClick: () => {},
};


export default NavbarItem;
