import React from 'react';

import UrlLabel from './UrlLabel.jsx';
import UrlLabelList from './UrlLabelList.jsx';

import {
  LABELS,
  COLORS,
  KEYS,
} from '../constants/labelTypes.js';


const AccessLinks = ({
  urls,
  notes,
  isUrlList,
}) => {
  if (!urls.server) { return null; }

  const wrapperColumn = (urls.demo || urls.theme) ? 6 : 12;

  return (
    <div className="row">
      {KEYS.map((key) => {
        if (!urls[key]) { return null; }

        return (
          <div className={`col-lg-${wrapperColumn} col-md-${wrapperColumn} col-sm-12 col-xs-12`}>
            {isUrlList ? (
              <UrlLabelList
                urls={urls[key]}
                label={LABELS[key]}
                className={COLORS[key]}
                isShortName={key === 'theme'}
              />
            ) : (
              <div>
                <UrlLabel
                  url={urls[key]}
                  label={LABELS[key]}
                  isOneLine={!urls.demo}
                  className={COLORS[key]}
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
