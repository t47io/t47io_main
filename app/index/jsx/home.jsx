import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

// import ImageLoader from '../../common/jsx/_image-loader.jsx';
import {
  home as tween,
  func,
} from '../js/tweens.js';

const imgAvatar = require('../img/t47_avatar.jpg');
const imgName = require('../img/t47_name.png');


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
    return (
      <section id="HOME__section">
        <div className="UTIL__parallax"
          style={{ backgroundImage: `url(${this.bgImage})` }}
        >
          <img alt="T47 Avatar"
            src={this.bgImage}
            style={{ display: 'none' }}
            onLoad={this.onLoad}
          />
        </div>

        {/* <ImageLoader extraClassName="UTIL__parallax"
           tinySrc={require('../img/t47_avatar@x.jpg')}
           fullSrc={require('../img/t47_avatar.jpg')} /> */}
        <div className="UTIL__cover HOME__shade"
          style={{ backgroundColor: `rgba(0, 7, 11, ${this.state.isShade ? 0.25 : 0})` }}
        />

        <div className="container">
          <SparkScroll.div className="HOME__content text-white"
            proxy="ABOUT__header"
            timeline={tween.fade}
          >
            <img alt="Siqi Tian" width="480"
              style={this.state.isName ? tween.name.end : tween.name.start}
              src={imgName}
            />
            <p className="text-white"
              style={{ marginTop: '-10px' }}
            >&nbsp;</p>
            <p className={`HOME__typewrite text-${this.state.textColor}`}>
              <span dangerouslySetInnerHTML={{ __html: this.state.title }} />
              <b className={`HOME__cursor ${this.state.isBlink ? 'blink' : ''}`}>
                {(this.state.isShade && this.state.isName) ? '|' : ''}
              </b>
            </p>
          </SparkScroll.div>
          <SparkScroll.div className="HOME__scroll_down"
            proxy="ABOUT__header"
            timeline={tween.fade}
          >
            <i className={`fa fa-3x fa-fw fa-down-circled text-${this.state.arrowColor}`} />
          </SparkScroll.div>

        </div>
      </section>
    );
  }
}
HomeSection.propTypes = {
  title: React.PropTypes.string.isRequired,
};


export default HomeSection;
