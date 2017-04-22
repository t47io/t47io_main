import React from 'react';

import UrlLabel from './UrlLabel.jsx';
import UrlLabelList from './UrlLabelList.jsx';


const labels = {
  server: 'Production',
  demo: 'Demonstration',
  theme: 'Theme',
};
const colors = {
  server: 'yellow',
  demo: 'gray',
  theme: 'purple',
};
const keys = ['server', 'demo', 'theme'];


const AccessLinks = ({
  urls,
  notes,
  isUrlList,
}) => {
  if (!urls.server) { return null; }

  const wrapperColumn = (urls.demo || urls.theme) ? 6 : 12;

  return (
    <div className="row">
      {keys.map((key) => {
        if (!urls[key]) { return null; }

        return (
          <div className={`col-lg-${wrapperColumn} col-md-${wrapperColumn} col-sm-12 col-xs-12`}>
            {isUrlList ? (
              <UrlLabelList
                urls={urls[key]}
                label={labels[key]}
                className={colors[key]}
              />
            ) : (
              <div>
                <UrlLabel
                  url={urls[key]}
                  label={labels[key]}
                  isOneLine={!urls.demo}
                  className={colors[key]}
                />
                {notes[key]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

AccessLinks.propTypes = {
  urls: React.PropTypes.shape({
    server: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.string),
      React.PropTypes.string,
    ]),
    demo: React.PropTypes.string,
    theme: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
  notes: React.PropTypes.shape({
    server: React.PropTypes.node,
    demo: React.PropTypes.node,
  }),
  isUrlList: React.PropTypes.bool,
};
AccessLinks.defaultProps = {
  urls: {
    server: '',
    demo: '',
    theme: [],
  },
  notes: {
    server: '',
    demo: '',
  },
  isUrlList: false,
};


export default AccessLinks;
