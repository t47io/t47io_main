import React from 'react';
import PropTypes from 'prop-types';


const AffiliationRewardItem = ({
  year,
  title,
}) => {
  if (!year) {
    return (
      <tr className="UTIL__spacer-sm" />
    );
  }

  return (
    <tr>
      <td className="AFFILIATION__reward">
        <i className="text-gray">{year}</i>
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
