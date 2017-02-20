import React from 'react';
import smoothScroll from 'smoothscroll';
import { Logo } from './logo.jsx';


const NavbarItem = ({
  item,
  section,
}) => (
  <li className={(item === section) ? 'active' : ''}>
    <a className="COMMON__navbar_link" href="#"
      onClick={() => smoothScroll(document.getElementById(`${item.toUpperCase()}__section`), 2000)}
    >
      {item}
    </a>
  </li>
);
NavbarItem.propTypes = {
  item: React.PropTypes.string.isRequired,
  section: React.PropTypes.string.isRequired,
};

class Navbar extends React.Component {
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

    return (
      <nav className={`COMMON__navbar navbar navbar-fixed-top ${top ? 'COMMON__navbar-transparent' : 'navbar-shrink COMMON__navbar-default'}`} role="navigation">
        <div className="container">
          <div className="COMMON__navbar_header navbar-header">
            <button type="button" className={`COMMON__navbar_toggle navbar-toggle ${toggle ? 'collapsed' : ''}`}
              onClick={this.onMobileCollapse}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Logo href="/" className={`COMMON__navbar_logo ${top ? 'green' : 'white'}`} />
          </div>

          <div className={`COMMON__navbar-collapse navbar-collapse ${toggle ? 'display' : ''}`} >
            <ul className="nav navbar-right" onClick={this.onScrollTo}>
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
