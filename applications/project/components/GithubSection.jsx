import React from 'react';

import Headline from './Headline.jsx';


const GithubSection = ({
  title,
}) => (
  <div className="row">
    <hr />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <Headline
        title="Repository"
        icon="fork"
      />
      {title}
    </div>
  </div>

);

GithubSection.propTypes = {
  title: React.PropTypes.string,
};
GithubSection.defaultProps = {
  title: '',
};


export default GithubSection;
