import React from 'react';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import AffiliationItem from '../components/AffiliationItem.jsx';

import { affiliation as tween } from '../js/tweens.js';
import '../stylesheets/AffiliationSection.scss';


class AffiliationSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scroll: this.props.items[0].year,
    };

    this.onScrollItem = this.onScrollItem.bind(this);
  }

  onScrollItem(year) {
    return ({
      currentPosition,
      previousPosition,
    }) => {
      if (currentPosition === 'inside' || previousPosition === 'inside') {
        this.setState({ scroll: year });
      }
    };
  }

  render() {
    const { items, background } = this.props;
    const { scroll } = this.state;

    return (
      <section id="AFFILIATION__section" className="text-center">
        <Carousel
          extraClassName="text-white"
          items={background} interval={4000}
        >
          <div className="UTIL__spacer-lg AFFILIATION__trigger" />
          <SectionHeader
            title="who i am" subtitle="where I have been"
            proxyId="AFFILIATION__header"
            tween={tween.header}
          />

          <div className="UTIL__spacer-lg" />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="AFFILIATION__story">
                <div className="AFFILIATION__timeline" />
                {items.map(item => (
                  <AffiliationItem
                    {...item}
                    scroll={scroll}
                    onPositionChange={this.onScrollItem}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="UTIL__spacer-lg" />
        </Carousel>
      </section>
    );
  }
}

AffiliationSection.propTypes = {
  items: React.PropTypes.array.isRequired,
  background: React.PropTypes.array.isRequired,
};


export default AffiliationSection;
