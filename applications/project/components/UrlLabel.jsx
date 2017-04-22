import React from 'react';


const UrlLabel = ({
  url,
  label,
  isOneLine,
  className,
}) => {
  if (isOneLine) {
    return (
      <p className="text-center">
        <span className={`lead label PROJECT__label--${className}`}>{label}</span>
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          {url}
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
    );
  }

  return (
    <div>
      <h3 className={`label PROJECT__label--${className}`}>{label}</h3>
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
  url: React.PropTypes.string,
  label: React.PropTypes.string,
  isOneLine: React.PropTypes.bool,
  className: React.PropTypes.string,
};
UrlLabel.defaultProps = {
  url: '#',
  label: 'Label',
  isOneLine: true,
  className: 'green',
};


export default UrlLabel;
