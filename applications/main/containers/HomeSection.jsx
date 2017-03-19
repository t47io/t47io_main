import React from 'react';

// import ImageLoader from '../../common/jsx/_image-loader.jsx';
import {
  home as tween,
  func,
} from '../js/tweens.js';
import '../stylesheets/HomeSection.scss';

const imgAvatar = require('../images/t47_avatar.jpg');
const imgName = require('../images/t47_name.png');


class HomeSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlayed: false,
      isBlink: true,
      isShade: true,
      isName: false,
      title: '',
      textColor: 'white',
      arrowColor: 'white',
    };
    this.bgImage = imgAvatar;

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    func.delay(1000, () => {
      document.querySelector('.LOAD__container').style.opacity = 0;
      return func.delay(1000, () => {
        document.querySelector('.LOAD__container').style.zIndex = -1;
      });
    })
    .then(() => this.setState({ ...(this.state), isName: true }))
    .then(() => tween.title(this.state, this.props.title, this.setState.bind(this)))
    .then(() => tween.color(this.state, this.setState.bind(this)));
  }


  render() {
    const shadeAlpha = this.state.isShade ? 0.5 : 0.25;
    const avatarStyle = this.state.isName ? tween.name.end : tween.name.start;
    const blinkClassName = this.state.isBlink ? 'blink' : '';
    const cursorChar = (this.state.isShade && this.state.isName) ? '|' : '';

    return (
      <section id="HOME__section">
        <div
          className="UTIL__parallax"
          style={{ backgroundImage: `url(${this.bgImage})` }}
        >
          <img
            src={this.bgImage}
            alt="T47 Avatar"
            style={{ display: 'none' }}
            onLoad={this.onLoad}
          />
        </div>

        {/* <ImageLoader className="UTIL__parallax"
           tinySrc={require('../images/t47_avatar@x.jpg')}
           fullSrc={require('../images/t47_avatar.jpg')} /> */}
        <div
          className="UTIL__cover HOME__shade"
          style={{ backgroundColor: `rgba(0, 7, 11, ${shadeAlpha})` }}
        />

        <div className="container">
          <div
            className="HOME__content text-white"
            proxy="ABOUT__header"
            timeline={tween.fade}
          >
            <img
              src={imgName}
              alt="Siqi Tian" width="480"
              className="HOME__title"
              style={avatarStyle}
            />
            <p
              className="text-white HOME__placeholder"
              style={{ marginTop: '-10px' }}
            />
            <p className={`HOME__typewrite text-${this.state.textColor}`}>
              <span dangerouslySetInnerHTML={{ __html: this.state.title }} />
              <b className={`HOME__cursor ${blinkClassName}`}>
                {cursorChar}
              </b>
            </p>
          </div>
          <div
            className="HOME__scroll_down"
            proxy="ABOUT__header"
            timeline={tween.fade}
          >
            <i className={`fa fa-3x fa-fw fa-down-circled text-${this.state.arrowColor}`} />
          </div>

        </div>
      </section>
    );
  }
}

HomeSection.propTypes = {
  title: React.PropTypes.string,
};


export default HomeSection;
