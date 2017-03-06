import React from 'react';
import smoothScroll from 'smoothscroll';
import { Logo } from './Logo.jsx';

import '../stylesheets/Navbar.scss';


const NavbarItem = ({
  item,
  section,
}) => (
  <li className={(item === section) ? 'active' : ''}>
    <a
      className="COMMON__navbar_link"
      onClick={() => smoothScroll(
        document.getElementById(`${item.toUpperCase()}__section`), 2000
      )}
    >
      {item}
    </a>
  </li>
);
NavbarItem.propTypes = {
  item: React.PropTypes.string.isRequired,
  section: React.PropTypes.string.isRequired,
};

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { toggle: false };

    this.onMobileCollapse = this.onMobileCollapse.bind(this);
    this.onScrollTo = this.onScrollTo.bind(this);
  }

  onMobileCollapse() {
    this.setState({ toggle: !(this.state.toggle) });
  }
  onScrollTo() {
    this.setState({ toggle: false });
  }

  render() {
    const { items, section, top } = this.props;
    const { toggle } = this.state;

    const navbarClassName = top ? 'COMMON__navbar-transparent' : 'navbar-shrink COMMON__navbar-default';
    const buttonClassName = toggle ? 'collapsed' : '';
    const logoClassName = top ? 'green' : 'white';
    const collapseClassName = toggle ? 'display' : '';

    return (
      <nav className={`COMMON__navbar navbar navbar-fixed-top ${navbarClassName}`} role="navigation">
        <div className="container">
          <div className="COMMON__navbar_header navbar-header">
            <button
              className={`COMMON__navbar_toggle navbar-toggle ${buttonClassName}`}
              type="button"
              onClick={this.onMobileCollapse}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Logo href="/" className={`COMMON__navbar_logo ${logoClassName}`} />
          </div>

          <div className={`COMMON__navbar-collapse navbar-collapse ${collapseClassName}`} >
            <ul
              className="nav navbar-right"
              onClick={this.onScrollTo}
            >
              {items.map(item => (
                <NavbarItem item={item} section={section} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  items: React.PropTypes.array.isRequired,
  section: React.PropTypes.string.isRequired,
  top: React.PropTypes.bool.isRequired,
};


export default Navbar;
