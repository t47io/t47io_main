import React from 'react';


const year = (new Date()).getFullYear();

const Footer = ({logo, copy, cc}) => (
  <footer>
    <div>
      Copyright <i className="fa fa-fw" dangerouslySetInnerHTML={{__html: copy}} ></i> <a>2015 - {year}</a>&nbsp;
      Designed, built & managed by&nbsp;
      <a href="https://t47.io/" rel="noopener" className="theme-author">
        <div className="sprite" style="height:14px; width:44px;"><i className="logo_alt_g"></i></div>
      </a>. All rights reserverd.
    </div>
    <p>
      Code and content on this site is licensed under&nbsp;
      <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener noreferrer external">
        <i className="fa fa-fw" dangerouslySetInnerHTML={{__html: cc}} ></i> BY-SA 4.0
      </a>.
    </p>
  </footer>
);


export default Footer;
