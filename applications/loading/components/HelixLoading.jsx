import React from 'react';
// import LogoAlt from '../../common/components/LogoAlt.jsx';

// import '../stylesheets/HelixLoading.scss';


const HelixLoading = ({ logo }) => (
  <div className="LOAD__container UTIL__image-RNA">
    <div className="LOAD__content">
      {/* <LogoAlt href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" className="LOAD__logo green-white" /> */}
      <a
        href="mailto:contact@t47.io"
        target="_blank" rel="noopener noreferrer external"
        className="LOAD__logo green-white"
        dangerouslySetInnerHTML={{ __html: logo }}
      />

      <div className="row">
        <div className="LOAD__helix center-block">
          {Array(...Array(26)).map(() => (
            <div className="LOAD__helix-dot" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

HelixLoading.propTypes = {
  logo: React.PropTypes.string,
};
HelixLoading.defaultProps = {
  logo: '',
};


export default HelixLoading;
