import React from 'react';
import PropTypes from 'prop-types';

import Meta from '../components/Meta.jsx';
import ErrorSection from '../components/ErrorSection.jsx';
import Footer from '../components/Footer.jsx';

import { ERROR_COLOR_CODES } from '../../config.js';


const ErrorPage = ({
  code,
  color,
  title,
  text,
}) => (
  <div className="body" id="app">
    <Meta />
    <div className="LOAD__container">
      <ErrorSection
        code={code}
        color={color}
        title={title}
        text={text}
      />
      <hr />
      <Footer />
    </div>
  </div>
);

ErrorPage.propTypes = {
  code: PropTypes.number,
  color: PropTypes.oneOf(ERROR_COLOR_CODES),
  title: PropTypes.shape({
    custom: PropTypes.string,
    standard: PropTypes.string,
  }),
  text: PropTypes.shape({
    custom: PropTypes.string,
    standard: PropTypes.string,
  }),
};
ErrorPage.defaultProps = {
  code: 500,
  color: 'red',
  title: {
    custom: '',
    standard: '',
  },
  text: {
    custom: '',
    standard: '',
  },
};


export default ErrorPage;
