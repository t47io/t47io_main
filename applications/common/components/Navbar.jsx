import React from 'react';
import NavbarItem from './NavbarItem.jsx';
import Logo from './Logo.jsx';

import '../stylesheets/Navbar.scss';


const Navbar = ({
  data: {
    items = [],
  },
  animations: {
    activeSection = 'home',
    isMobileCollapsed = false,
  },
  actions: {
    scrollToSection = () => {},
    toggleMobileCollapse = () => {},
  },
}) => {
  const navbarClassName = (activeSection === 'home') ? 'COMMON__navbar-transparent' : 'navbar-shrink COMMON__navbar-default';
  const buttonClassName = isMobileCollapsed ? 'collapsed' : '';
  const logoClassName = (activeSection === 'home') ? 'green' : 'white';
  const collapseClassName = isMobileCollapsed ? 'display' : '';

  return (
    <nav className={`COMMON__navbar navbar navbar-fixed-top ${navbarClassName}`} role="navigation">
      <div className="container">
        <div className="COMMON__navbar_header navbar-header">
          <button
            className={`COMMON__navbar_toggle navbar-toggle ${buttonClassName}`}
            type="button"
            onClick={toggleMobileCollapse}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Logo href="/" className={`COMMON__navbar_logo ${logoClassName}`} />
        </div>

        <div className={`COMMON__navbar-collapse navbar-collapse ${collapseClassName}`} >
          <ul className="nav navbar-right">
            {items.map((item, i) => (
              <NavbarItem
                key={`COMMON__navbar-${i}`}
                name={item}
                isActive={item === activeSection}
                onClick={() => scrollToSection(item)}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
  animations: React.PropTypes.shape({
    activeSection: React.PropTypes.string,
    isMobileCollapsed: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    scrollToSection: React.PropTypes.func,
    toggleMobileCollapse: React.PropTypes.func,
  }),
};


export default Navbar;
