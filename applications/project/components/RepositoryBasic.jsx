import React from 'react';


const RepositoryBasic = ({
  name,
  url,
  isPrivate,
  createdAt,
  pushedAt,
  issues,
  forks,
  watchers,
  stars,
}) => {
  const privateLabel = isPrivate ? 'private' : 'public';

  return (
    <div className="PROJECT__repo-basics">
      <p>
        <mark className="lead PROJECT__repo-name">{name}</mark>
        <span className="label PROJECT__label--gray">{privateLabel}</span>
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
        <span className="label PROJECT__label--yellow">{createdAt}</span>
        <span className="label PROJECT__label--green">last pushed</span>
        <span className="label PROJECT__label--yellow">{pushedAt}</span>
      </p>
      <p className="PROECT__repo-stats">
        <span className="label PROJECT__label--red">issue</span>
        <span className="PROJECT__repo-stats-number">{issues}</span>
        <span className="label PROJECT__label--blue">fork</span>
        <span className="PROJECT__repo-stats-number">{forks}</span>
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
  url: React.PropTypes.string,
  isPrivate: React.PropTypes.bool,
  createdAt: React.PropTypes.string,
  pushedAt: React.PropTypes.string,
  issues: React.PropTypes.number,
  forks: React.PropTypes.number,
  watchers: React.PropTypes.number,
  stars: React.PropTypes.number,
};
RepositoryBasic.defaultProps = {
  name: '',
  url: '',
  isPrivate: false,
  createdAt: '',
  pushedAt: '',
  issues: 0,
  forks: 0,
  watchers: 0,
  stars: 0,
};


export default RepositoryBasic;
