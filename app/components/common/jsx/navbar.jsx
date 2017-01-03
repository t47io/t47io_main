import React from 'react';
import smoothScroll from 'smoothscroll';


const scrollTo = (target) => smoothScroll(document.getElementById(target), 2000);


const NavbarItem = ({item, section}) => (
	<li className={(item === section) ? "active" : ""} >
		<a href="javascript:void(0)" className="page-scroll" onClick={scrollTo.bind(this, `${item.toUpperCase()}__section`)} >{item}</a>
	</li>
);

const Navbar = ({items, section, top}) => (
  <header id="header" className="header-main">
    <nav id="main-navbar" className={`navbar navbar-fixed-top ${top ? "navbar-transparent" : "navbar-shrink navbar-default"}`} role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="/">
          	<i className={`${top ? "logo_g" : "logo_o"}`} ></i>
          </a>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
          	{items.map((item) => (<NavbarItem item={item} section={section} />))}
          </ul>
        </div>
      </div>
    </nav>
  </header>
);


export default Navbar;
