import React from 'react';
import PropTypes from 'prop-types';

import Meta from '../components/Meta.jsx';
import ErrorSection from '../components/ErrorSection.jsx';
import Footer from '../components/Footer.jsx';

import { ERROR_COLOR_CODES } from '../../common/constants/util.js';


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
  code: PropTypes.number,
  color: PropTypes.oneOf(ERROR_COLOR_CODES),
  img: PropTypes.string,
  title: PropTypes.shape({
    custom: PropTypes.string,
    standard: PropTypes.string,
  }),
  text: PropTypes.shape({
    custom: PropTypes.string,
    standard: PropTypes.string,
  }),
  copy: PropTypes.string,
  cc: PropTypes.string,
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
