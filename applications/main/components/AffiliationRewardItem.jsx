import React from 'react';


const AffiliationRewardItem = ({
  year,
  title,
}) => (
  <tr>
    <td>
      <i className="text-gray">{year}</i>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </td>
    <td dangerouslySetInnerHTML={{ __html: title }} />
  </tr>
);

AffiliationRewardItem.propTypes = {
  year: React.PropTypes.number,
  title: React.PropTypes.string,
};
AffiliationRewardItem.defaultProps = {
  year: NaN,
  title: '',
};


export default AffiliationRewardItem;
