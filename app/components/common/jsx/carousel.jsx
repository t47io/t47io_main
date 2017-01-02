import React from 'react';


const IndicatorItem = ({current, onClick, index}) => (
  <li data-slide={index} className={current === index ? "active" : ""} onClick={onClick} ></li>
);


class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {current: 0};
	}
	componentDidMount() {
		this.onLoop();
	}

	onClick(e) {
		clearInterval(this.timer);
		this.setState({current: parseInt(e.target.dataset.slide)});
		this.onLoop();
	}
	onLoop() {
		this.timer = setInterval(() => {
			const next = (this.state.current + 1) % this.props.items.length;
			this.setState({current: next});
		}, this.props.interval);
	}

	render() {
		const {items, extraClassName, children} = this.props, {current} = this.state;
		return (
      <div className={`${extraClassName} parallax bg_rotate_fade`}
      	style={`background-image: url('/img/background/${items[current]}.jpg')`} >
				<div className="carousel carousel-fade slide">
	        <ol className="carousel-indicators">
	        	{items.map((item, i) => (<IndicatorItem current={current} index={i} onClick={this.onClick.bind(this)} />))}
	        </ol>
	        <div className="carousel-inner" role="listbox"></div>
				</div>
        <div className="cover"></div>

        {children}
			</div>
		);
	}
}


export default Carousel;
