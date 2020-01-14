import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-unused-vars */
import cssType from '../../common/mixins/typography.scss';
import cssPubs from '../stylesheets/PubsSection.scss';
/* eslint-enable */


const PubsCiteElement = ({ citation }) => {
  if (!citation) { return null; }

  return (
    <span styleName="cssPubs.PUBS__cite cssType.text-gray cssType.bg-gray-light" className="pull-right">
      <i className="fa fa-fw fa-balance-scale" />
      <i>
        <small>Cited by :</small>
      </i>
      <u styleName="cssType.text-black">{citation}</u>
    </span>
  );
};

PubsCiteElement.propTypes = {
  citation: PropTypes.number,
};
PubsCiteElement.defaultProps = {
  citation: NaN,
};


export default PubsCiteElement;
