import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../common/components/Logo.jsx';

import { ERROR_COLOR_CODES } from '../../common/constants/util.js';


const ErrorSection = ({
  code,
  color,
  img,
  title,
  text,
}) => (
  <div className="LOAD__content UTIL__image-RNA">
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <Logo className="filled" />
      <img
        className="ERROR__image"
        src={img}
        alt={`HTTP Error ${code}`}
        height="auto"
      />
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <h2 className="ERROR__title">
        <span className={`label PROJECT__label--${color}`} >
          {title.custom}
        </span>
      </h2>
      <p>
        <b dangerouslySetInnerHTML={{ __html: text.custom.replace(/\n/g, '<br/>') }} />
      </p>
      <p className="ERROR__words">
        <i>In other words,</i>
      </p>
      <h3>
        <span className={`label PROJECT__label--${color}`}>
          {code}: {title.standard}
        </span>
      </h3>
      <p dangerouslySetInnerHTML={{ __html: text.standard.replace(/\n/g, '<br/>') }} />
    </div>
  </div>
);

ErrorSection.propTypes = {
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
};
ErrorSection.defaultProps = {
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
};


export default ErrorSection;
