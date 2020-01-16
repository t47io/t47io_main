import React from 'react';
import PropTypes from 'prop-types';

import { GITHUB_HOST } from '../../config.js';

import cssType from '../stylesheets/typography.scss';
import cssRepo from '../stylesheets/GitHubSection.scss';


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
    <div styleName="cssRepo.PROJECT__repo-basics">
      <p>
        <mark styleName="cssRepo.PROJECT__repo-name" className="lead">{name}</mark>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--red" className="label">{privateLabel}</span>
      </p>
      <p styleName="cssRepo.PROJECT__repo-link">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <code>{url}</code>
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
      <p styleName="cssRepo.PROJECT__repo-stats">
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--green" className="label">created</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--gray" className="label">{createdAt}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--green" className="label">last pushed</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--gray" className="label">{pushedAt}</span>
      </p>
      <p styleName="cssRepo.PROJECT__repo-stats">
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--yellow" className="label">issue</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{issues}</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--yellow" className="label">download</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{downloads}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--blue" className="label">fork</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{forks}</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--blue" className="label">pull</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{pulls}</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--blue" className="label">branch</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{branches}</span>
        <br className="hidden-lg hidden-md hidden-sm" />
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--purple" className="label">watcher</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{watchers}</span>
        <span styleName="cssType.PROJECT__label cssType.PROJECT__label--purple" className="label">star</span>
        <span styleName="cssRepo.PROJECT__repo-stats-number">{stars}</span>
      </p>
    </div>
  );
};

RepositoryBasic.propTypes = {
  name: PropTypes.string,
  isPrivate: PropTypes.bool,
  createdAt: PropTypes.string,
  pushedAt: PropTypes.string,
  issues: PropTypes.number,
  downloads: PropTypes.number,
  forks: PropTypes.number,
  pulls: PropTypes.number,
  branches: PropTypes.number,
  watchers: PropTypes.number,
  stars: PropTypes.number,
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
