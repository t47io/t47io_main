import React from 'react';
import PropTypes from 'prop-types';

import UrlLabel from './UrlLabel.jsx';
import UrlLabelList from './UrlLabelList.jsx';

import {
  LABELS,
  COLORS,
  KEYS,
} from '../constants/labelTypes.js';
import { getColumn } from '../util.js';


const AccessLinks = ({
  urls,
  notes,
  isUrlList,
}) => {
  if (!urls.prod && !urls.server) { return null; }

  const wrapperColumn = getColumn(urls.demo || urls.theme);

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
                isLead={key !== 'theme'}
              />
            ) : (
              <div className="PROJECT__access-link">
                <UrlLabel
                  url={urls[key]}
                  label={LABELS[key]}
                  isOneLine={!urls.demo}
                  isLead
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
  urls: PropTypes.shape({
    prod: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    demo: PropTypes.string,
    server: PropTypes.string,
    theme: PropTypes.arrayOf(PropTypes.string),
  }),
  notes: PropTypes.shape({
    prod: PropTypes.node,
    demo: PropTypes.node,
  }),
  isUrlList: PropTypes.bool,
};
AccessLinks.defaultProps = {
  urls: {
    prod: '',
    demo: '',
    server: '',
    theme: [],
  },
  notes: {
    prod: '',
    demo: '',
  },
  isUrlList: false,
};


export default AccessLinks;
