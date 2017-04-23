import React from 'react';

import DropdownItem from './DropdownItem.jsx';


const NavbarItem = ({
  name,
  dropdown,
  isActive,
  onClick,
}) => {
  const isDropdown = (dropdown.length);
  const activeClassName = isActive ? 'active' : '';
  const hrefObj = isDropdown ? {
    href: isActive ? '#' : '/',
  } : {
    onClick,
  };

  return (
    <li className={`COMMON__navbar-item ${activeClassName}`}>
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
