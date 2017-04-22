import React from 'react';

import Headline from './Headline.jsx';
import UrlLabel from './UrlLabel.jsx';

const AccessSection = ({
  repoUrl,
  serverUrl,
  demoUrl,
  serverNote,
  demoNote,
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
    <div className="row">
      {repoUrl && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <UrlLabel
            url={repoUrl}
            label="Repository"
            className="purple"
          />
        </div>
      )}
    </div>
    {demoUrl ? (
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <UrlLabel
            url={serverUrl}
            label="Production"
            isOneLine={false}
            className="yellow"
          />
          {serverNote}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <UrlLabel
            url={demoUrl}
            label="Demonstration"
            isOneLine={false}
            className="gray"
          />
          {demoNote}
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <UrlLabel
            url={serverUrl}
            label="Production"
            className="yellow"
          />
          {serverNote}
        </div>
      </div>
    )}
  </div>
);

AccessSection.propTypes = {
  repoUrl: React.PropTypes.string,
  serverUrl: React.PropTypes.string,
  demoUrl: React.PropTypes.string,
  serverNote: React.PropTypes.node,
  demoNote: React.PropTypes.node,
};
AccessSection.defaultProps = {
  repoUrl: '',
  serverUrl: '',
  demoUrl: '',
  serverNote: '',
  demoNote: '',
};


export default AccessSection;
