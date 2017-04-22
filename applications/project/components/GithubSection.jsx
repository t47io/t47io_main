import React from 'react';

import Headline from './Headline.jsx';


const GithubSection = ({
  
}) => (
  <div className="row">
    <hr />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <Headline
        title="Repository"
        icon="fork"
      />
    </div>
  </div>

);

GithubSection.propTypes = {
  
};
GithubSection.defaultProps = {
  
};


export default GithubSection;
