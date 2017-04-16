import React from 'react';


const NavbarItem = ({
  name,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? 'active' : '';

  return (
    <li className={`COMMON__navbar-item ${activeClassName}`}>
      <a
        className="COMMON__navbar-link"
        onClick={onClick}
      >
        {name}
      </a>
    </li>
  );
};

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
