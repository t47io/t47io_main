import React from 'react';
import ReactTooltip from 'react-tooltip';

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
      ReactTooltip.rebuild();
    }, this.props.interval);
  }

  render() {
    const { project, items, className, index } = this.props;
    const { current } = this.state;
    const spriteName = `SPRITE__${project}-${index}_${items[current].tag}`;

    return (
      <div className={className}>
        <div className="PROJECT__carousel">
          <ol className="PROJECT__carousel-indicators carousel-indicators">
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
            <div className="thumbnail PROJECT__thumbnail">
              <div className={`${spriteName} PROJECT__carousel-item`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  project: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    tag: React.PropTypes.string,
    label: React.PropTypes.string,
  })),
  className: React.PropTypes.string,
  interval: React.PropTypes.number,
  index: React.PropTypes.number,
};
Carousel.defaultProps = {
  project: '',
  items: [],
  className: 'col-lg-7 col-md-7 col-sm-12 col-xs-12',
  interval: 2500,
  index: 0,
};


export default Carousel;
