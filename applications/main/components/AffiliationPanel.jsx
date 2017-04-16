import React from 'react';

import AffiliationRewardItem from './AffiliationRewardItem.jsx';
import AffiliationRole from './AffiliationRole.jsx';


const AffiliationPanel = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
}) => (
  <div className="AFFILIATION__panel row">
    <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <a
        href={url}
        target="_blank" rel="noopener noreferrer external"
      >
        <div className="SPRITE">
          <div className={`SPRITE__affiliation-${tag}`} />
        </div>
      </a>
      <br />
      <a
        href={url}
        target="_blank" rel="noopener noreferrer external"
      >
        {title}
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
      <br />
      <span className="AFFILIATION__geo">{geo}</span>
    </div>
    <div className="AFFILIATION__text col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <AffiliationRole {...role} />
      <br className="hidden-xs hidden-sm" />
      <table className="hidden-xs hidden-sm">
        <tbody>
          {rewards.map((item, i) => (
            <AffiliationRewardItem
              key={`AFFILIATION__reward-${year}-${i}`}
              {...item}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

AffiliationPanel.propTypes = {
  year: React.PropTypes.number,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  geo: React.PropTypes.string,
  role: React.PropTypes.object,
  rewards: React.PropTypes.arrayOf(React.PropTypes.object),
  tag: React.PropTypes.string,
};
AffiliationPanel.defaultProps = {
  year: NaN,
  title: '',
  url: '',
  geo: '',
  role: {},
  rewards: [],
  tag: '',
};


export default AffiliationPanel;
