import React from 'react';

import AccessLinks from './AccessLinks.jsx';
import Headline from './Headline.jsx';
import UrlLabel from './UrlLabel.jsx';


const AccessSection = ({
  urls,
  notes,
  isUrlList,
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
    />
  </div>
);

AccessSection.propTypes = {
  urls: React.PropTypes.shape({
    repo: React.PropTypes.string,
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
AccessSection.defaultProps = {
  urls: {
    repo: '',
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


export default AccessSection;
