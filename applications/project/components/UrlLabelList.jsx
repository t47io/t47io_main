import React from 'react';


const UrlLabelList = ({
  urls,
  label,
  className,
  isShortName,
}) => (
  <div>
    <h3 className={`label PROJECT__label--${className}`}>{label}</h3>
    {urls.map(url => (
      <p className="text-center lead">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          {isShortName ? url.replace('https://github.com/t47io/', '').replace('/', '') : url}
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
  isShortName: React.PropTypes.bool,
};
UrlLabelList.defaultProps = {
  urls: [],
  label: 'Label',
  className: 'green',
  isShortName: false,
};


export default UrlLabelList;
