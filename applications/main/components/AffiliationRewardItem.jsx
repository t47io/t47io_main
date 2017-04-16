import React from 'react';


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
  year: React.PropTypes.number,
  title: React.PropTypes.string,
};
AffiliationRewardItem.defaultProps = {
  year: NaN,
  title: '',
};


export default AffiliationRewardItem;
