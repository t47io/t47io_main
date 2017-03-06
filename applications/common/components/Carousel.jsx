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

  onClick(e) {
    clearInterval(this.timer);
    this.setState({ current: parseInt(e.target.dataset.slide, 10) });
    this.onLoop();
  }
  onLoop() {
    this.timer = setInterval(() => {
      const next = (this.state.current + 1) % this.props.items.length;
      this.setState({ current: next });
    }, this.props.interval);
  }

  render() {
    const { items, extraClassName, children } = this.props;
    const { current } = this.state;

    return (
      <div className={`${extraClassName} SPRITE__bg-${items[current]} UTIL__parallax bg fade`}>
        <div className="COMMON__carousel fade">
          <ol className="COMMON__carousel_indicators carousel-indicators">
            {items.map((item, i) => (
              <CarouselIndicator current={current} index={i} onClick={this.onClick} />
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
  items: React.PropTypes.array.isRequired,
  extraClassName: React.PropTypes.string.isRequired,
  interval: React.PropTypes.number.isRequired,
};


export default Carousel;
