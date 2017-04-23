import React from 'react';

import AccessLinks from './AccessLinks.jsx';
import Headline from './Headline.jsx';
import UrlLabel from './UrlLabel.jsx';

import '../stylesheets/AccessSection.scss';


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
  urls: React.PropTypes.shape({
    repo: React.PropTypes.string,
    prod: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.string),
      React.PropTypes.string,
    ]),
    demo: React.PropTypes.string,
    server: React.PropTypes.string,
    theme: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
  notes: React.PropTypes.shape({
    prod: React.PropTypes.node,
    demo: React.PropTypes.node,
  }),
  isUrlList: React.PropTypes.bool,
  isRow: React.PropTypes.bool,
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
