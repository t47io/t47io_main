import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logo from '../components/Logo.jsx';
import NavbarItem from '../components/NavbarItem.jsx';

import * as navbarActions from '../actions/navbarActions.js';
import { HOME } from '../../main/constants/sectionTypes.js';

import '../stylesheets/Navbar.scss';


const Navbar = ({
  data: {
    items,
    dropdown,
  },
  animations: {
    activeSection,
    isMobileCollapsed,
  },
  actions: {
    scrollToSection,
    toggleMobileCollapse,
  },
}) => {
  const navbarClassName = (activeSection === HOME) ? 'COMMON__navbar--transparent' : 'navbar-shrink COMMON__navbar--default';
  const buttonClassName = isMobileCollapsed ? 'collapsed' : '';
  const logoClassName = (activeSection === HOME) ? 'green' : 'white';
  const collapseClassName = isMobileCollapsed ? 'display' : '';

  return (
    <nav className={`COMMON__navbar navbar navbar-fixed-top ${navbarClassName}`} role="navigation">
      <div className="container">
        <div className="COMMON__navbar-header navbar-header">
          <button
            className={`COMMON__navbar-toggle navbar-toggle ${buttonClassName}`}
            type="button"
            onClick={toggleMobileCollapse}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Logo
            href="/"
            isTargetBlank={false}
            className={`COMMON__navbar-logo ${logoClassName}`}
          />
        </div>

        <div className={`COMMON__navbar--collapse navbar-collapse ${collapseClassName}`} >
          <ul className="nav navbar-right COMMON__navbar-dropdown">
            {items.map((item, i) => (
              <NavbarItem
                key={`COMMON__navbar-${i}`}
                name={item}
                dropdown={dropdown}
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
    dropdown: React.PropTypes.arrayOf(React.PropTypes.string),
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
Navbar.defaultProps = {
  data: {
    items: [],
    dropdown: [],
  },
  animations: {
    activeSection: HOME,
    isMobileCollapsed: false,
  },
  actions: {
    scrollToSection: () => {},
    toggleMobileCollapse: () => {},
  },
};


const mapStateToProps = state => (state.navbar);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(navbarActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
