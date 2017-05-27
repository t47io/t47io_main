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
    <div>
      <p>
        <mark className="lead">{name}</mark>
        <span className="label PROJECT__label--gray">{privateLabel}</span>
      </p>
      <p>
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <code>{url}</code>
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </p>
      <p>
        <span className="label PROJECT__label--green">created</span>
        <span className="label PROJECT__label--yellow">{createdAt}</span>
        <span className="label PROJECT__label--green">last pushed</span>
        <span className="label PROJECT__label--yellow">{pushedAt}</span>
      </p>
      <p>
        <span className="label PROJECT__label--red">issue</span>
        <span>{issues}</span>
        <span className="label PROJECT__label--blue">fork</span>
        <span>{forks}</span>
        <span className="label PROJECT__label--purple">watcher</span>
        <span>{watchers}</span>
        <span className="label PROJECT__label--purple">star</span>
        <span>{stars}</span>
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
