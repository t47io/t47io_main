import React from 'react';
import PropTypes from 'prop-types';

import { GITHUB_HOST } from '../../config.js';


const UrlLabelList = ({
  urls,
  label,
  className,
  isShortName,
  isLead,
}) => {
  const leadClassName = isLead ? 'lead' : '';

  return (
    <div>
      <h3>
        <span className={`label PROJECT__label--${className}`}>{label}</span>
      </h3>
      {urls.map(url => (
        <p className={`text-center ${leadClassName}`}>
          <a
            href={url}
            target="_blank" rel="noopener noreferrer external"
          >
            {isShortName ? url.replace(`${GITHUB_HOST}/t47io/`, '').replace('/', '') : url}
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>
        </p>
      ))}
    </div>
  );
};

UrlLabelList.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  className: PropTypes.string,
  isShortName: PropTypes.bool,
  isLead: PropTypes.bool,
};
UrlLabelList.defaultProps = {
  urls: [],
  label: 'Label',
  className: 'green',
  isShortName: false,
  isLead: false,
};


export default UrlLabelList;
