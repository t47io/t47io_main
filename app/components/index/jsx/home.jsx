import React from 'react';

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
    };
  }

  componentDidMount() {
    func.delay(800)
    .then(() => this.setState({...(this.state), isName: true}))
    .then(() => tween.title(this.state, this.props.title, this.setState.bind(this)));
  }

  render() {
    return (
      <section id="HOME__section" className="parallax" style="background-image:url('/img/t47/t47_avatar.jpg')">
        <div className="cover HOME__shade" style={{backgroundColor: `rgba(0, 7, 11, ${this.state.isShade ? 0.75 : 0.25})`}}></div>
        <div className="container">
          <div className="HOME__content text-white">
            <img src='/img/t47/t47_name_2_line.gif' alt="Siqi Tian" width="480" style={this.state.isName ? tween.name.end : tween.name.start} />
            <p className="text-white" style="margin-top: -10px;">&nbsp;</p>
            <p className="text-white" style="line-height: 25px; height: 50px;">
              <span dangerouslySetInnerHTML={{__html: this.state.title}} ></span>
              <b class={`HOME__cursor ${this.state.isBlink ? "blink" : ""}`} >{(this.state.isShade & this.state.isName) ? "|" : ""}</b>
            </p>
          </div>
          <div className="HOME__scroll_down">
            <i className="fa fa-3x fa-fw fa-arrow-circle-down"></i>
          </div>

        </div>
      </section>
    );
  }
}


export default HomeSection;
