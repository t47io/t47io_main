import React from 'react';


const UrlLabelList = ({
  urls,
  label,
  className,
}) => (
  <div>
    <h3 className={`label PROJECT__label--${className}`}>{label}</h3>
    {urls.map(url => (
      <p className="text-center lead">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          {url}
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
    ))}
  </div>
);

UrlLabelList.propTypes = {
  urls: React.PropTypes.arrayOf(React.PropTypes.string),
  label: React.PropTypes.string,
  className: React.PropTypes.string,
};
UrlLabelList.defaultProps = {
  urls: [],
  label: 'Label',
  className: 'green',
};


export default UrlLabelList;
