import React from 'react';

import Meta from '../components/Meta.jsx';
import ErrorSection from '../components/ErrorSection.jsx';
import Footer from '../components/Footer.jsx';


const ErrorPage = ({
  code,
  color,
  img,
  title,
  text,
  copy,
  cc,
}) => (
  <div className="body" id="app">
    <Meta />
    <div className="LOAD__container">
      <ErrorSection
        code={code}
        color={color}
        img={img}
        title={title}
        text={text}
      />
      <hr />
      <Footer
        copy={copy}
        cc={cc}
      />
    </div>
  </div>
);

ErrorPage.propTypes = {
  code: React.PropTypes.number,
  color: React.PropTypes.oneOf(['green', 'blue', 'yellow', 'purple', 'red']),
  img: React.PropTypes.string,
  title: React.PropTypes.shape({
    custom: React.PropTypes.string,
    standard: React.PropTypes.string,
  }),
  text: React.PropTypes.shape({
    custom: React.PropTypes.string,
    standard: React.PropTypes.string,
  }),
  copy: React.PropTypes.string,
  cc: React.PropTypes.string,
};
ErrorPage.defaultProps = {
  code: 500,
  color: 'red',
  img: '',
  title: {
    custom: '',
    standard: '',
  },
  text: {
    custom: '',
    standard: '',
  },
  copy: '',
  cc: '',
};


export default ErrorPage;
