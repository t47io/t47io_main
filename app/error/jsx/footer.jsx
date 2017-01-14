import React from 'react';


const year = (new Date()).getFullYear();

const Footer = ({logo, copy, cc}) => (
  <footer>
    <p>
      Copyright <i className="fa" dangerouslySetInnerHTML={{__html: copy}} ></i> <a>2015 - {year}</a>&nbsp;
      Designed, built & managed by&nbsp;
      <a href="https://t47.io/" rel="noopener" className="green-white" dangerouslySetInnerHTML={{__html: logo}} ></a>.&nbsp;
      All rights reserverd.
    </p>
    <p>
      Code and content on this site is licensed under&nbsp;
      <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener noreferrer external">
        <i className="fa" dangerouslySetInnerHTML={{__html: cc}} ></i>&nbsp;BY-SA 4.0
      </a>.
    </p>
  </footer>
);


export default Footer;
