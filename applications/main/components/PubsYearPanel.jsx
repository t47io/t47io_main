import React from 'react';

import Animation from '../../common/components/Animation.jsx';
import PubsItem from './PubsItem.jsx';


const PubsYearPanel = ({
  year,
  items,
  counter,
  offset,
}) => (
  <div className="row PUBS__row">
    <Animation
      className="col-lg-1 col-md-1 col-sm-2 col-xs-3 PUBS__year"
      shouldAnimate={offset < counter}
    >
      {year}
    </Animation>
    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-9 PUBS__content">
      {items.filter(item => (!item.isHidden))
        .map((item, i) => (
          <PubsItem
            key={`PUBS__entry-${year}-${i}`}
            year={year}
            shouldAnimate={i + offset < counter}
            {...item}
          />
        )
      )}
    </div>
  </div>
);

PubsYearPanel.propTypes = {
  year: React.PropTypes.number,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  counter: React.PropTypes.number,
  offset: React.PropTypes.number,
};
PubsYearPanel.defaultProps = {
  year: NaN,
  items: [],
  counter: NaN,
  offset: 0,
};


export default PubsYearPanel;
