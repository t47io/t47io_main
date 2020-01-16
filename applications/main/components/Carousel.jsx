import React from 'react';
import PropTypes from 'prop-types';

import { imgBackgrounds } from './Images.js';
import CarouselIndicator from './CarouselIndicator.jsx';

import { SVG_BG_INDICES } from '../constants/util.js';

import cssSvg from '../stylesheets/svg.scss';
import cssUtil from '../stylesheets/util.scss';
import cssCarousel from '../stylesheets/Carousel.scss';


class Carousel extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    interval: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  };

  static defaultProps = {
    items: [],
    interval: 2000,
  };

  state = {
    current: 0,
    active: false,
  };

  componentDidMount() {
    this.onLoop();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onChange = (index) => {
    this.setState({
      current: index,
      active: false,
    });
    setTimeout(() => {
      this.setState({ active: true });
    }, this.props.interval / 10);
  };

  onLoop = () => {
    this.timer = setInterval(() => {
      const next = (this.state.current + 1) % this.props.items.length;
      this.onChange(next);
    }, this.props.interval);
  };

  onClick = (index) => {
    clearInterval(this.timer);
    this.onChange(index);
    this.onLoop();
  };

  render() {
    const { items, children } = this.props;
    const { current, active } = this.state;
    const svgClassName = active ? cssCarousel.active : '';
    const tag = items[current];

    return (
      <div styleName="cssSvg.SVG cssCarousel.UTIL__carousel cssUtil.UTIL__background">
        <div styleName="cssCarousel.SVG__background cssCarousel.UTIL__carousel--fade" className={svgClassName}>
          {SVG_BG_INDICES.map(i => (
            <img
              key={`SVG__background-${tag}--${i}`}
              styleName={`cssSvg.SVG--${i} cssCarousel.SVG--${i}`}
              src={imgBackgrounds[i][tag]}
              alt={tag}
            />
          ))}
          <ol styleName="cssCarousel.UTIL__carousel-indicators" className="carousel-indicators">
            {items.map((item, i) => (
              <CarouselIndicator
                key={`UTIL__carousel-indicator-${items[i]}`}
                index={i}
                isActive={i === current}
                onClick={this.onClick}
              />
            ))}
          </ol>
        </div>
        <div styleName="cssUtil.UTIL__cover" />

        {children}
      </div>
    );
  }
}


export default Carousel;
