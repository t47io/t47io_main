import React from 'react';
import PropTypes from 'prop-types';

import { backgroundImgs } from './Images.js';
import CarouselIndicator from './CarouselIndicator.jsx';

import '../stylesheets/Carousel.scss';


class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { current: 0 };

    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.onLoop();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClick(index) {
    clearInterval(this.timer);
    this.setState({ current: index });
    this.onLoop();
  }
  onLoop() {
    this.timer = setInterval(() => {
      const next = (this.state.current + 1) % this.props.items.length;
      this.setState({ current: next });
    }, this.props.interval);
  }

  render() {
    const { items, className, children } = this.props;
    const { current } = this.state;
    const SvgImg = backgroundImgs[items[current]] ? backgroundImgs[items[current]].default : null;

    return (
      <div className={`${className} UTIL__parallax UTIL__background`}>
        <div className="COMMON__carousel COMMON__carousel--fade">
          <SvgImg preserveAspectRatio="xMaxYMax slice" />
          <ol className="COMMON__carousel-indicators carousel-indicators">
            {items.map((item, i) => (
              <CarouselIndicator
                key={`COMMON__carousel-indicator-${items[i]}`}
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
