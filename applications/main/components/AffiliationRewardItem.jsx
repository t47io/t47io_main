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


export default AffiliationRewardItem;
