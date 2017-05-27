import React from 'react';

import Headline from './Headline.jsx';
import Repository from './Repository.jsx';


const GithubSection = ({ repos }) => (
  <div className="row">
    <hr />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <Headline
        title="Repository"
        icon="fork"
      />
      {repos.map(repo => (
        <Repository
          {...repo}
          key={repo.basics.name}
        />
      ))}
    </div>
  </div>

);

GithubSection.propTypes = {
  repos: React.PropTypes.arrayOf(React.PropTypes.object),
};
GithubSection.defaultProps = {
  repos: [],
};


export default GithubSection;
