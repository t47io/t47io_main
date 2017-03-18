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
    const { items, extraClassName } = this.props;
    const { current } = this.state;

    return (
      <div className={`${extraClassName} SPRITE__bg-${items[current]} UTIL__parallax UTIL__background`}>
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

        {this.props.children}
      </div>
    );
  }
}

Carousel.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.string),
  extraClassName: React.PropTypes.string,
  interval: React.PropTypes.number,
};
Carousel.defaultProps = {
  items: [],
  extraClassName: '',
  interval: 2000,
};


export default Carousel;
