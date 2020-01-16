import React from 'react';
import PropTypes from 'prop-types';

import AffiliationRewardItem from './AffiliationRewardItem.jsx';
import AffiliationRole from './AffiliationRole.jsx';

import { imgAffiliations } from './Images.js';
import {
  SVG_INDICES,
  TARGET_BLANK,
} from '../../common/constants/util.js';

import cssSvg from '../stylesheets/svg.scss';
import cssAff from '../stylesheets/AffiliationSection.scss';


const AffiliationPanel = ({
  title,
  url,
  geo,
  roles,
  rewards,
  tag,
}) => (
  <div styleName="cssAff.AFFILIATION__panel" className="row">
    <div styleName="cssAff.AFFILIATION__title" className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <a href={url} {...TARGET_BLANK}>
        <div styleName="cssSvg.SVG cssSvg.SVG--delay cssAff.SVG cssAff.SVG--delay">
          {SVG_INDICES.map(i => (
            <img
              key={`AFFILIATION__panel--${i}`}
              styleName={`cssSvg.SVG--${i + 1} cssAff.SVG--${i}`}
              src={imgAffiliations[i][tag]}
              alt={tag}
            />
          ))}
        </div>
      </a>
      <br />
      <a href={url} {...TARGET_BLANK}>
        {title}
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
      <br />
      <span styleName="cssAff.AFFILIATION__geo">{geo}</span>
    </div>
    <div styleName="cssAff.AFFILIATION__text" className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      {roles.map((item, i) => (
        <AffiliationRole
          key={`AFFILIATION__role-${tag}-${i}`}
          {...item}
        />
      ))}
      <br className="hidden-xs hidden-sm" />
      <table className="hidden-xs hidden-sm">
        <tbody>
          {rewards.map((item, i) => (
            <AffiliationRewardItem
              key={`AFFILIATION__reward-${tag}-${i}`}
              {...item}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

AffiliationPanel.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  geo: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.object),
  rewards: PropTypes.arrayOf(PropTypes.object),
  tag: PropTypes.string,
};
AffiliationPanel.defaultProps = {
  title: '',
  url: '',
  geo: '',
  roles: [],
  rewards: [],
  tag: '',
};


export default AffiliationPanel;
