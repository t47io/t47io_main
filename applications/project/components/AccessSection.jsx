import React from 'react';
import PropTypes from 'prop-types';

import AccessLinks from './AccessLinks.jsx';
import Headline from './Headline.jsx';
import UrlLabel from './UrlLabel.jsx';


const AccessSection = ({
  urls,
  notes,
  isUrlList,
  isRow,
}) => (
  <div className="text-center">
    <div className="row">
      <hr />
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Headline
          title="Access"
          icon="hand-pointer-o"
        />
      </div>
    </div>
    {urls.repo && (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <UrlLabel
            url={urls.repo}
            label="Repository"
            className="purple"
          />
        </div>
      </div>
    )}
    <AccessLinks
      urls={urls}
      notes={notes}
      isUrlList={isUrlList}
      isRow={isRow}
    />
    <br />
  </div>
);

AccessSection.propTypes = {
  urls: PropTypes.shape({
    repo: PropTypes.string,
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
  isRow: PropTypes.bool,
};
AccessSection.defaultProps = {
  urls: {
    repo: '',
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
  isRow: true,
};


export default AccessSection;
