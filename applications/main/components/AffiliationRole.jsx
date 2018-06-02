import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
import cssType from '../../common/mixins/typography.scss';
import cssAff from '../stylesheets/AffiliationSection.scss';
/* eslint-enable */


const AffiliationRole = ({
  title,
  position,
  team,
}) => (
  <p styleName="cssAff.AFFILIATION__role">
    <b>{position}</b>
    <span> {title}</span>
    <br className="hidden-lg hidden-md" />
    <span styleName="cssType.text-main"> @ </span>
    <u>{team}</u>
  </p>
);

AffiliationRole.propTypes = {
  title: PropTypes.string,
  position: PropTypes.string,
  team: PropTypes.string,
};
AffiliationRole.defaultProps = {
  title: '',
  position: '',
  team: '',
};


export default AffiliationRole;
