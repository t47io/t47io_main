import React from 'react';
import PropTypes from 'prop-types';

import { GITHUB_HOST } from '../../config.js';
import { TARGET_BLANK } from '../../common/constants/util.js';

import '../stylesheets/typography.scss';


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
        <span styleName={`PROJECT__label PROJECT__label--${className}`} className="label">
          {label}
        </span>
      </h3>
      {urls.map(url => (
        <p className={`text-center ${leadClassName}`}>
          <a href={url} {...TARGET_BLANK}>
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
