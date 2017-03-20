import React from 'react';

import AffiliationItem from '../components/AffiliationItem.jsx';
import AffiliationScrollSpy from '../components/AffiliationScrollSpy.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';

import '../stylesheets/AffiliationSection.scss';


const AffiliationSection = ({
  data: {
    items,
    years,
    backgrounds,
  },
  animations: {
    header,
    panel,
  },
  actions: {
    animateHeader,
    animatePanels,
  },
}) => (
  <section id="AFFILIATION__section" className="text-center">
    <Carousel
      className="text-white"
      items={backgrounds} interval={4000}
    >
      <div className="UTIL__spacer-lg AFFILIATION__trigger" />
      <SectionHeader
        title="who i am"
        subtitle="where I have been"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />

      <div className="UTIL__spacer-lg" />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="AFFILIATION__story">
            <AffiliationScrollSpy
              className="AFFILIATION__timeline"
              years={years}
              onToggleAnimation={animatePanels}
            />

            {items.map((item, i) => (
              <AffiliationItem
                key={`AFFILIATION__item-${i}`}
                {...item}
                shouldAnimate={panel === item.year}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="UTIL__spacer-lg" />
    </Carousel>
  </section>
);

AffiliationSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    years: React.PropTypes.arrayOf(React.PropTypes.number),
    backgrounds: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    panel: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animatePanels: React.PropTypes.func,
  }),
};
AffiliationSection.defaultProps = {
  data: {
    items: [],
    years: [],
    backgrounds: [],
  },
  animations: {
    header: false,
    panel: (new Date()).getFullYear(),
  },
  actions: {
    animateHeader: () => {},
    animatePanels: () => {},
  },
};


export default AffiliationSection;
