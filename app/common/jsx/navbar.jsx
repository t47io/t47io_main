import React from 'react';
import smoothScroll from 'smoothscroll';
import {Logo} from './logo.jsx';


const scrollTo = (target) => smoothScroll(document.getElementById(target), 2000);


const NavbarItem = ({item, section}) => (
	<li className={(item === section) ? "active" : ""} >
		<a href="javascript:void(0)" className="COMMON__navbar_link" onClick={scrollTo.bind(this, `${item.toUpperCase()}__section`)} >{item}</a>
	</li>
);

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggle: false};
  }

  onMobileCollapse() {
    this.setState({toggle: !(this.state.toggle)});
  }

  render() {
    const {items, section, top} = this.props, {toggle} = this.state;
    return (
      <nav className={`COMMON__navbar navbar navbar-fixed-top ${top ? "COMMON__navbar-transparent" : "navbar-shrink COMMON__navbar-default"}`} role="navigation">
        <div className="container">
          <div className="COMMON__navbar_header navbar-header">
            <button type="button" className={`COMMON__navbar_toggle navbar-toggle ${toggle ? "collapsed" : ""}`} onClick={this.onMobileCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Logo href="/" className={`COMMON__navbar_logo ${top ? "green" : "white"}`} />
          </div>

          <div className={`COMMON__navbar-collapse navbar-collapse ${toggle ? "display" : ""}`} >
            <ul className="nav navbar-right">
            	{items.map((item) => (<NavbarItem item={item} section={section} />))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default Navbar;
