import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import CarouselIndicator from './CarouselIndicator.jsx';

import cssFeat from '../stylesheets/FeatureSection.scss';
import cssSprite from '../stylesheets/sprites.scss';


class Carousel extends React.PureComponent {
  static propTypes = {
    project: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string,
      label: PropTypes.string,
    })),
    className: PropTypes.string,
    interval: PropTypes.number,
    index: PropTypes.number,
  };

  static defaultProps = {
    project: '',
    items: [],
    className: 'col-lg-7 col-md-7 col-sm-12 col-xs-12',
    interval: 2500,
    index: 0,
  };

  state = { current: 0 };

  componentDidMount() {
    this.onLoop();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onChange = (index) => {
    this.setState({ current: index });
  };

  onLoop = () => {
    this.timer = setInterval(() => {
      const next = (this.state.current + 1) % this.props.items.length;
      this.onChange(next);
      ReactTooltip.rebuild();
    }, this.props.interval);
  };

  onClick = (index) => {
    clearInterval(this.timer);
    this.onChange(index);
    this.onLoop();
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { project, items, className, index } = this.props;
    const { current } = this.state;
    const spriteName = cssSprite[`SPRITE__${project}-${index}_${items[current].tag}`];

    return (
      <div className={className}>
        <div styleName="cssFeat.PROJECT__carousel">
          <ol styleName="cssFeat.PROJECT__carousel-indicators" className="carousel-indicators">
            {items.map((item, i) => (
              <CarouselIndicator
                key={`PROJECT__carousel-indicator-${item.tag}`}
                index={i}
                isActive={i === current}
                onClick={this.onClick}
              />
            ))}
          </ol>
          <div
            className="carousel-inner"
            data-for="PROJECT__tooltip"
            data-tip={items[current].label}
          >
            <div styleName="cssFeat.PROJECT__thumbnail" className="thumbnail">
              <div styleName="cssFeat.PROJECT__carousel-item" className={spriteName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Carousel;
