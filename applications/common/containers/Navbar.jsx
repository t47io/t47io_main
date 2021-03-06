import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Logo from '../components/Logo.jsx';
import NavbarItem from '../components/NavbarItem.jsx';

import * as navbarActions from '../actions/navbarActions.js';
import { initialState as navbarProps } from '../reducers/navbar.js';
import { noOp } from '../util.js';
import { NAVBAR } from '../constants/sectionTypes.js';
import { HOME } from '../../main/constants/sectionTypes.js';

import cssNav from '../stylesheets/Navbar.scss';


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
  const navbarClassName = (activeSection === HOME) ?
    cssNav['COMMON__navbar--transparent'] : `navbar-shrink ${cssNav['COMMON__navbar--default']}`;
  const buttonClassName = isMobileCollapsed ? 'collapsed' : '';
  const logoClassName = (activeSection === HOME) ? 'filled' : 'white';
  const collapseClassName = isMobileCollapsed ? cssNav.display : '';

  return (
    <nav styleName="cssNav.COMMON__navbar" className={`navbar navbar-fixed-top ${navbarClassName}`}>
      <div className="container">
        <div styleName="cssNav.COMMON__navbar-header" className="navbar-header">
          <button
            styleName="cssNav.COMMON__navbar-toggle"
            className={`navbar-toggle ${buttonClassName}`}
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
            styleName="cssNav.COMMON__navbar-logo"
            className={`${logoClassName}`}
          />
        </div>

        <div styleName="cssNav.COMMON__navbar--collapse" className={`navbar-collapse ${collapseClassName}`}>
          <ul styleName="cssNav.COMMON__navbar-dropdown" className="nav navbar-right">
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
    scrollToSection: noOp,
    toggleMobileCollapse: noOp,
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
