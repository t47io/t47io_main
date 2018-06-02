import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../common/components/Logo.jsx';
import { imgErrors } from '../components/Images.js';

import { ERROR_COLOR_CODES } from '../../config.js';


const ErrorSection = ({
  code,
  color,
  title,
  text,
}) => (
  <div className="LOAD__content UTIL__image-RNA">
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <Logo className="filled" />
      <div className="ERROR__image">
        {code.toString().split('').map(dig => (
          <img
            key={`digit-${dig}`}
            className="ERROR__image-digit"
            src={imgErrors[dig]}
            alt={`HTTP Error ${code}`}
          />
        ))}
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <h2 className="ERROR__title">
        <span className={`label PROJECT__label PROJECT__label--${color}`} >
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
        <span className={`label PROJECT__label PROJECT__label--${color}`}>
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
