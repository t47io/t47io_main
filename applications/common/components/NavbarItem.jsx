import React from 'react';


const NavbarItem = ({
  name,
  isActive,
  onClick,
}) => (
  <li className={`COMMON__navbar-item ${isActive ? 'active' : ''}`}>
    <a
      className="COMMON__navbar_link"
      onClick={onClick}
    >
      {name}
    </a>
  </li>
);

NavbarItem.propTypes = {
  name: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
NavbarItem.defaultProps = {
  name: '',
  isActive: false,
  onClick: () => {},
};


export default NavbarItem;
