import React from 'react';

import DropdownItem from './DropdownItem.jsx';
import { PORTFOLIO } from '../../main/constants/sectionTypes.js';


const NavbarItem = ({
  name,
  dropdown,
  isActive,
  onClick,
}) => {
  const isDropdown = (dropdown.length > 0);
  const dropdownClassName = isDropdown ? 'dropdown' : '';
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
        <ul className="dropdown-menu nav nav-pills nav-stacked">
          {dropdown.map(item => (
            <DropdownItem item={item} />
          ))}
        </ul>
      )}
    </li>
  );
};

NavbarItem.propTypes = {
  name: React.PropTypes.string,
  dropdown: React.PropTypes.arrayOf(React.PropTypes.string),
  isActive: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
NavbarItem.defaultProps = {
  name: '',
  dropdown: [],
  isActive: false,
  onClick: () => {},
};


export default NavbarItem;
