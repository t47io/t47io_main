import React from 'react';
import PropTypes from 'prop-types';

import cssType from '../../common/mixins/typography.scss';
import cssUtil from '../stylesheets/util.scss';
import cssAff from '../stylesheets/AffiliationSection.scss';


const AffiliationRewardItem = ({
  year,
  title,
}) => {
  if (!year) {
    return (
      <tr styleName="cssUtil.UTIL__spacer-sm" />
    );
  }

  return (
    <tr>
      <td styleName="cssAff.AFFILIATION__reward">
        <i styleName="cssType.text-gray">{year}</i>
      </td>
      <td dangerouslySetInnerHTML={{ __html: title }} />
    </tr>
  );
};

AffiliationRewardItem.propTypes = {
  year: PropTypes.number,
  title: PropTypes.string,
};
AffiliationRewardItem.defaultProps = {
  year: NaN,
  title: '',
};


export default AffiliationRewardItem;
