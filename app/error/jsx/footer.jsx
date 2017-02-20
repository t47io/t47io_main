import React from 'react';


const year = (new Date()).getFullYear();

const Footer = ({
  logo,
  copy,
  cc,
}) => (
  <footer>
    <p>
      Copyright
      <i className="fa" dangerouslySetInnerHTML={{ __html: copy }} />
      <a>2015 - {year}</a>
      Designed, built & managed by
      <a href="https://t47.io/" rel="noopener" className="green-white" dangerouslySetInnerHTML={{ __html: logo }} />
      All rights reserverd.
    </p>
    <p>
      Code and content on this site is licensed under
      <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener noreferrer external">
        <i className="fa" dangerouslySetInnerHTML={{ __html: cc }} />
        BY-SA 4.0
      </a>.
    </p>
  </footer>
);
Footer.propTypes = {
  logo: React.PropTypes.string.isRequired,
  copy: React.PropTypes.string.isRequired,
  cc: React.PropTypes.string.isRequired,
};


export default Footer;
