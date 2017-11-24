import React from 'react';
import PropTypes from 'prop-types';

import AffiliationRewardItem from './AffiliationRewardItem.jsx';
import AffiliationRole from './AffiliationRole.jsx';

import { affiliationThumbs } from './Images.js';


const AffiliationPanel = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
}) => {
  const SvgThumb = affiliationThumbs[tag] ? affiliationThumbs[tag].default : null;

  return (
    <div className="AFFILIATION__panel row">
      <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <div className="UTIL__svg-thumb">
            <SvgThumb />
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
};

AffiliationPanel.propTypes = {
  year: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  geo: PropTypes.string,
  role: PropTypes.object,
  rewards: PropTypes.arrayOf(PropTypes.object),
  tag: PropTypes.string,
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
