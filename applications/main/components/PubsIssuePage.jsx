import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-unused-vars */
import cssType from '../../common/mixins/typography.scss';
import cssPubs from '../stylesheets/PubsSection.scss';
/* eslint-enable */


const PubsIssuePage = ({
  issue,
  page,
  isPreprint,
}) => {
  if (isPreprint) {
    return (
      <span styleName="cssPubs.PUBS__issue">
        , <span styleName="cssType.text-gray">{issue}</span>.
      </span>
    );
  }

  return (
    <span styleName="cssPubs.PUBS__issue">
      <b>{issue}</b>: {page}.
    </span>
  );
};

PubsIssuePage.propTypes = {
  issue: PropTypes.string,
  page: PropTypes.string,
  isPreprint: PropTypes.bool,
};
PubsIssuePage.defaultProps = {
  issue: '',
  page: '',
  isPreprint: false,
};


export default PubsIssuePage;
