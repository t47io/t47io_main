import React from 'react';

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
        icon="book"
      />
      <p className="lead text-center">
        Complete
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
    </div>
  </div>
);

DocsSection.propTypes = {
  labels: React.PropTypes.arrayOf(React.PropTypes.string),
  urls: React.PropTypes.arrayOf(React.PropTypes.string),
  joinWord: React.PropTypes.string,
};
DocsSection.defaultProps = {
  labels: [],
  urls: [],
  joinWord: ' and ',
};


export default DocsSection;
