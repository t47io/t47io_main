import React from 'react';
import PropTypes from 'prop-types';

import DropdownItem from './DropdownItem.jsx';

import { noOp } from '../util.js';
import { PORTFOLIO } from '../../main/constants/sectionTypes.js';

import cssNav from '../stylesheets/Navbar.scss';
import cssDrop from '../stylesheets/Dropdown.scss';


const NavbarItem = ({
  name,
  dropdown,
  isActive,
  onClick,
}) => {
  const isDropdown = (dropdown && dropdown.length > 0);
  const dropdownClassName = isDropdown ? `dropdown ${cssDrop.COMMON__dropdown}` : '';
  const activeClassName = isActive ? `${cssNav.active} ${cssDrop.active}` : '';
  const hrefObj = !isDropdown ? { onClick } : {
    href: (isActive ? `/#${PORTFOLIO}__section` : '/'),
  };

  return (
    <li styleName="cssNav.COMMON__navbar-item" className={`${activeClassName} ${dropdownClassName}`}>
      <a
        styleName="cssNav.COMMON__navbar-link"
        {...hrefObj}
      >
        {name}
        {isDropdown && isActive && (
          <span className="caret" />
        )}
      </a>
      {isDropdown && isActive && (
        <ul styleName="cssDrop.COMMON__dropdown-menu" className="dropdown-menu nav nav-pills nav-stacked">
          {dropdown.map(title => (
            <DropdownItem
              key={title}
              title={title}
            />
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
  onClick: noOp,
};


export default NavbarItem;
