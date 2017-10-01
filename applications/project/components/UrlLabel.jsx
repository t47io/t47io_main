import React from 'react';
import PropTypes from 'prop-types';


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
          <span className={`label PROJECT__label--${className}`}>{label}</span>
        </span>
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
          className={leadClassName}
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
        <span className={`label PROJECT__label--${className}`}>{label}</span>
      </h3>
      <p className="text-center lead">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
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
