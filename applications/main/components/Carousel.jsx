import React from 'react';
import PropTypes from 'prop-types';

import { imgBackgrounds } from './Images.js';
import CarouselIndicator from './CarouselIndicator.jsx';

import { SVG_BG_INDICES } from '../constants/util.js';

import '../stylesheets/Carousel.scss';


class Carousel extends React.PureComponent {
  state = {
    current: 0,
    active: false,
  }

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
  }
  onLoop = () => {
    this.timer = setInterval(() => {
      const next = (this.state.current + 1) % this.props.items.length;
      this.onChange(next);
    }, this.props.interval);
  }
  onClick = (index) => {
    clearInterval(this.timer);
    this.onChange(index);
    this.onLoop();
  }

  render() {
    const { items, className, children } = this.props;
    const { current, active } = this.state;
    const svgClassName = active ? 'active' : '';
    const tag = items[current];

    return (
      <div className={`${className} SVG UTIL__carousel UTIL__background`}>
        <div className={`SVG__background ${svgClassName} UTIL__carousel--fade`}>
          {SVG_BG_INDICES.map(i => (
            <img
              key={`SVG__background-${tag}--${i}`}
              className={`SVG--${i}`}
              src={imgBackgrounds[i][tag]}
              alt={tag}
            />
          ))}
          <ol className="UTIL__carousel-indicators carousel-indicators">
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
        <div className="UTIL__cover" />

        {children}
      </div>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  interval: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
Carousel.defaultProps = {
  items: [],
  className: '',
  interval: 2000,
};


export default Carousel;
