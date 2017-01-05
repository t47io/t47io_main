import React from 'react';
import {SparkScroll} from '../../common/js/factory.js';
import ImageLoader from '../../common/jsx/_image-loader.jsx';

import {home as tween, func} from '../js/tweens.js';


class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayed: false,
      isBlink: true,
      isShade: true,
      isName: false,
      title: "",
      textColor: "white",
      arrowColor: "white"
    };
  }

  componentDidMount() {
    func.delay(800)
    .then(() => this.setState({...(this.state), isName: true}))
    .then(() => tween.title(this.state, this.props.title, this.setState.bind(this)))
    .then(() => {
      tween.color(this.state, this.setState.bind(this));
    });
  }


  render() {
    return (
      <section id="HOME__section">
        <ImageLoader tinySrc={require('../img/blur/t47_avatar.jpg')} fullSrc={require('../img/t47_avatar.jpg')} />
        <div className="UTIL__cover HOME__shade" style={{backgroundColor: `rgba(0, 7, 11, ${this.state.isShade ? 0.25 : 0})`}} ></div>

        <div className="container">
          <SparkScroll.div className="HOME__content text-white"
            proxy="ABOUT__header"
            timeline={tween.fade} >
            <img alt="Siqi Tian" width="480"
              style={this.state.isName ? tween.name.end : tween.name.start}
              src={require('../img/t47_name.gif')} />
            <p className="text-white" style="margin-top: -10px;">&nbsp;</p>
            <p className={`HOME__typewrite text-${this.state.textColor}`} >
              <span dangerouslySetInnerHTML={{__html: this.state.title}} ></span>
              <b className={`HOME__cursor ${this.state.isBlink ? "blink" : ""}`} >{(this.state.isShade && this.state.isName) ? "|" : ""}</b>
            </p>
          </SparkScroll.div>
          <SparkScroll.div className="HOME__scroll_down"
            proxy="ABOUT__header"
            timeline={tween.fade} >
            <i className={`fa fa-3x fa-fw fa-down-circled text-${this.state.arrowColor}`} ></i>
          </SparkScroll.div>

        </div>
      </section>
    );
  }
}


export default HomeSection;
