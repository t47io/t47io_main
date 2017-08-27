import React from 'react';

import { GITHUB_HOST } from '../../config.js';


const RepositoryBasic = ({
  name,
  isPrivate,
  createdAt,
  pushedAt,
  issues,
  downloads,
  forks,
  pulls,
  branches,
  watchers,
  stars,
}) => {
  const privateLabel = isPrivate ? 'private' : 'public';
  const url = `${GITHUB_HOST}${name}`;

  return (
    <div className="PROJECT__repo-basics">
      <p>
        <mark className="lead PROJECT__repo-name">{name}</mark>
        <span className="label PROJECT__label--red">{privateLabel}</span>
      </p>
      <p className="PROECT__repo-link">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <code>{url}</code>
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
      <p className="PROECT__repo-stats">
        <span className="label PROJECT__label--green">created</span>
        <span className="label PROJECT__label--gray">{createdAt}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span className="label PROJECT__label--green">last pushed</span>
        <span className="label PROJECT__label--gray">{pushedAt}</span>
      </p>
      <p className="PROECT__repo-stats">
        <span className="label PROJECT__label--yellow">issue</span>
        <span className="PROJECT__repo-stats-number">{issues}</span>
        <span className="label PROJECT__label--yellow">download</span>
        <span className="PROJECT__repo-stats-number">{downloads}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span className="label PROJECT__label--blue">fork</span>
        <span className="PROJECT__repo-stats-number">{forks}</span>
        <span className="label PROJECT__label--blue">pull</span>
        <span className="PROJECT__repo-stats-number">{pulls}</span>
        <span className="label PROJECT__label--blue">branch</span>
        <span className="PROJECT__repo-stats-number">{branches}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span className="label PROJECT__label--purple">watcher</span>
        <span className="PROJECT__repo-stats-number">{watchers}</span>
        <span className="label PROJECT__label--purple">star</span>
        <span className="PROJECT__repo-stats-number">{stars}</span>
      </p>
    </div>
  );
};

RepositoryBasic.propTypes = {
  name: React.PropTypes.string,
  isPrivate: React.PropTypes.bool,
  createdAt: React.PropTypes.string,
  pushedAt: React.PropTypes.string,
  issues: React.PropTypes.number,
  downloads: React.PropTypes.number,
  forks: React.PropTypes.number,
  pulls: React.PropTypes.number,
  branches: React.PropTypes.number,
  watchers: React.PropTypes.number,
  stars: React.PropTypes.number,
};
RepositoryBasic.defaultProps = {
  name: '',
  isPrivate: false,
  createdAt: '',
  pushedAt: '',
  issues: 0,
  downloads: 0,
  forks: 0,
  pulls: 0,
  branches: 0,
  watchers: 0,
  stars: 0,
};


export default RepositoryBasic;
