import React from 'react';
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

    return (
      <div className={`${className} SPRITE__bg-${items[current]} UTIL__parallax UTIL__background`}>
        <div className="COMMON__carousel COMMON__carousel_fade">
          <ol className="COMMON__carousel_indicators carousel-indicators">
            {items.map((item, i) => (
              <CarouselIndicator
                key={`COMMON__carousel_indicator-${items[i]}`}
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
  items: React.PropTypes.arrayOf(React.PropTypes.string),
  className: React.PropTypes.string,
  interval: React.PropTypes.number,
  children: React.PropTypes.node,
};
Carousel.defaultProps = {
  items: [],
  className: '',
  interval: 2000,
  children: undefined,
};


export default Carousel;
