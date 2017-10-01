import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Logo from '../components/Logo.jsx';
import NavbarItem from '../components/NavbarItem.jsx';

import * as navbarActions from '../actions/navbarActions.js';
import { initialState as navbarProps } from '../reducers/navbar.js';
import { NAVBAR } from '../constants/sectionTypes.js';
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
  const logoClassName = (activeSection === HOME) ? 'filled' : 'white';
  const collapseClassName = isMobileCollapsed ? 'display' : '';

  return (
    <nav className={`COMMON__navbar navbar navbar-fixed-top ${navbarClassName}`}>
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
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
    dropdown: PropTypes.arrayOf(PropTypes.string),
  }),
  animations: PropTypes.shape({
    activeSection: PropTypes.string,
    isMobileCollapsed: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    scrollToSection: PropTypes.func,
    toggleMobileCollapse: PropTypes.func,
  }),
};
Navbar.defaultProps = {
  ...navbarProps,
  actions: {
    scrollToSection: () => {},
    toggleMobileCollapse: () => {},
  },
};


const mapStateToProps = state => (state[NAVBAR]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(navbarActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
