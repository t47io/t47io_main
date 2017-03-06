import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import PubsItem from './PubsItem.jsx';

import { pubs as tween } from '../js/tweens.js';


const PubsYearPanel = ({
  year,
  items,
}) => (
  <div className="row PUBS__row">
    <SparkScroll.div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 PUBS__year"
      timeline={tween.year}
    >
      {year}
    </SparkScroll.div>
    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9 PUBS__content">
      {items.filter(item => (!item.isHidden)).map(item => (
        <PubsItem {...item} year={year} />
      ))}
    </div>
  </div>
);

PubsYearPanel.propTypes = {
  year: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
};


export default PubsYearPanel;
