import React from 'react';
import Waypoint from 'react-waypoint';

import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import { affiliation as tween } from '../js/tweens.js';


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

const AffiliationRole = ({
  title,
  position,
  team,
}) => (
  <p>
    <b>{position}</b>
    {` ${title}`}
    <br className="hidden-lg hidden-md" />
    <span className="text-green">{' @ '}</span>
    <u>{team}</u>
  </p>
);
AffiliationRole.propTypes = {
  title: React.PropTypes.string.isRequired,
  position: React.PropTypes.string.isRequired,
  team: React.PropTypes.string.isRequired,
};

const AffiliationItem = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
  scroll,
  onPositionChange,
}) => (
  <div className="AFFILIATION__entry"
    id={`story_${year}`}
    style={{ zIndex: (year === scroll) ? 15 : 10 }}
  >
    <div className={`AFFILIATION__content ${(year === scroll) ? 'active' : ''}`} >
      <span className="AFFILIATION__year">{year}</span>
      <div className="AFFILIATION__panel row">
        <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <a href={url} target="_blank" rel="noopener noreferrer external">
            <div className="SPRITE">
              <div className={`SPRITE__affiliation-${tag}`} />
            </div>
          </a>
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer external">
            {title}
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>
          <br />
          <span>{geo}</span>
        </div>
        <div className="AFFILIATION__text col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <AffiliationRole {...role} />
          <br className="hidden-xs hidden-sm" />
          <table className="hidden-xs hidden-sm">
            <tbody>
              {rewards.map(item => (<AffiliationRewardItem {...item} />))}
            </tbody>
          </table>
        </div>
      </div>
      <Waypoint onPositionChange={onPositionChange(year)} />
    </div>
  </div>
);
AffiliationItem.propTypes = {
  year: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  geo: React.PropTypes.string.isRequired,
  role: React.PropTypes.object.isRequired,
  rewards: React.PropTypes.array.isRequired,
  tag: React.PropTypes.string.isRequired,
  scroll: React.PropTypes.number.isRequired,
  onPositionChange: React.PropTypes.func.isRequired,
};

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
        <Carousel extraClassName="text-white"
          items={background} interval={4000}
        >
          <div className="UTIL__spacer-lg AFFILIATION__trigger" />
          <SectionHeader title="who i am" subtitle="where I have been"
            proxyId="AFFILIATION__header"
            tween={tween.header}
          />

          <div className="UTIL__spacer-lg" />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="AFFILIATION__story">
                <div className="AFFILIATION__timeline" />
                {items.map(item => (
                  <AffiliationItem {...item}
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
