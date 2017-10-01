import React from 'react';
import PropTypes from 'prop-types';

import Headline from './Headline.jsx';


const DocsSection = ({
  labels,
  urls,
  joinWord,
}) => (
  <div className="row">
    <hr />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <Headline
        title="Documentation"
        icon="paste"
      />
      <p className="lead text-center">
        <span>Complete </span>
        {labels.map((label, i) => (
          <span>
            <a
              href={urls[i]}
              target="_blank" rel="noopener noreferrer external"
            >
              {label}
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>
            {(i !== labels.length - 1) && joinWord}
          </span>
        ))}
      </p>
      <br />
    </div>
  </div>
);

DocsSection.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  urls: PropTypes.arrayOf(PropTypes.string),
  joinWord: PropTypes.string,
};
DocsSection.defaultProps = {
  labels: [],
  urls: [],
  joinWord: ' and ',
};


export default DocsSection;
