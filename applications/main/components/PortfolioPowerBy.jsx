import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import PortfolioPowerByItem from './PortfolioPowerByItem.jsx';

import {
  LICENSE,
  REPOSITORY,
} from '../../config.js';
import { TARGET_BLANK } from '../../common/constants/util.js';

import cssType from '../../common/mixins/typography.scss';
import cssPort from '../stylesheets/PortfolioSection.scss';


const PortfolioPowerBy = ({
  items,
  appInfo,
  shouldAnimate,
}) => (
  <div styleName="cssPort.PORTFOLIO__power-by">
    <h5 styleName="cssPort.PORTFOLIO__find-more cssType.text-gray" className="text-center">
      <span className="fa-stack">
        <i styleName="cssType.text-main-light" className="fa fa-fw fa-blank fa-stack-2x" />
        <i styleName="cssType.text-white" className="fa fa-fw fa-coffee fa-stack-1x" />
      </span>
      This site is
      <i> (proudly) </i>
      <b styleName="cssType.text-black">Powered By</b>
    </h5>

    <ul styleName="cssPort.PORTFOLIO__brands" className="text-center">
      {items.map((item, i) => (
        <PortfolioPowerByItem
          key={`PORTFOLIO__brand-${item.name}`}
          {...item}
          shouldAnimate={shouldAnimate}
          index={i}
        />
      ))}
    </ul>

    <p styleName="cssPort.PORTFOLIO__find-more" className="text-center">
      <a href={REPOSITORY} {...TARGET_BLANK}>
        Code and content
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
      on this site is licensed under
      <a href={LICENSE} {...TARGET_BLANK}>
        <i className="fa fa-fw fa-creative-commons" />
        BY-NC-SA 4.0
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>.
    </p>
    <p styleName="cssPort.PORTFOLIO__find-more" className="text-center">
      Current version
      {' '}
      <b><u>{appInfo.version}</u></b>
      <span styleName="cssType.text-gray"> @ </span>
      <a href={`${REPOSITORY}commit/${appInfo.commit}/`} {...TARGET_BLANK}>
        {appInfo.commit}
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
    </p>

    <ReactTooltip
      id="PORTFOLIO__tooltip"
      effect="solid"
      place="bottom"
      insecure={false}
    />
  </div>
);

PortfolioPowerBy.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })),
  appInfo: PropTypes.shape({
    version: PropTypes.string,
    commit: PropTypes.string,
  }),
  shouldAnimate: PropTypes.bool,
};
PortfolioPowerBy.defaultProps = {
  items: [],
  appInfo: {},
  shouldAnimate: false,
};


export default PortfolioPowerBy;
