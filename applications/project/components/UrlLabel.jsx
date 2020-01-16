import React from 'react';
import PropTypes from 'prop-types';

import { TARGET_BLANK } from '../../common/constants/util.js';

import '../stylesheets/typography.scss';


const UrlLabel = ({
  url,
  label,
  isOneLine,
  isLead,
  className,
}) => {
  const leadClassName = isLead ? 'lead' : '';

  if (isOneLine) {
    return (
      <p className="text-center">
        <span className="lead">
          <span styleName={`PROJECT__label PROJECT__label--${className}`} className="label">
            {label}
          </span>
        </span>
        <a
          className={leadClassName}
          href={url}
          {...TARGET_BLANK}
        >
          {url}
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
    );
  }

  return (
    <div>
      <h3>
        <span styleName={`PROJECT__label PROJECT__label--${className}`} className="label">
          {label}
        </span>
      </h3>
      <p className="text-center lead">
        <a href={url} {...TARGET_BLANK}>
          {url}
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
    </div>
  );
};

UrlLabel.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  isOneLine: PropTypes.bool,
  isLead: PropTypes.bool,
  className: PropTypes.string,
};
UrlLabel.defaultProps = {
  url: '#',
  label: 'Label',
  isOneLine: true,
  isLead: false,
  className: 'green',
};


export default UrlLabel;
