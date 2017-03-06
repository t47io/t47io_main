import React from 'react';
// import {
//   SparkScroll,
//   SparkProxy,
// } from '../../common/js/factory.js';
import Scrollspy from './Scrollspy.jsx';
import Animation from './Animation.jsx';

const beginStyle = {
  transform: 'translateY(-100%)',
  opacity: 0,
};
const endStyle = {
  transform: 'translateY(0%)',
  opacity: 1,
};


class SectionHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasAnimated: false };
    this.onChangeAnimation = this.onChangeAnimation.bind(this);
  }

  onChangeAnimation(bool) {
    console.log(bool);
    this.setState({ hasAnimated: bool });
  }

  render() {
    const {
      title,
      subtitle,
      // proxyId,
      // tween,
    } = this.props;
    const { hasAnimated } = this.state;

    return (
      <Scrollspy onChangeAnimation={this.onChangeAnimation}>
        <Animation beginStyle={beginStyle} endStyle={endStyle} hasAnimated={hasAnimated}>
          <h2>{title}</h2>
          <div className="UTIL__divider" />
          <p className="UTIL__section_subtitle">
            {subtitle}
          </p>
        </Animation>
      </Scrollspy>
    );
  }
}

SectionHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  // proxyId: React.PropTypes.string.isRequired,
  // tween: React.PropTypes.object.isRequired,
};


export default SectionHeader;

      // <SparkProxy.div className="container"
      //   proxyId={proxyId}
      // >
      //   <SparkScroll.div className={`UTIL__section_header text-center ${proxyId}`}
      //     proxy={proxyId}
      //     timeline={tween}
      //   >
      //     <h2>{title}</h2>
      //     <div className="UTIL__divider" />
      //     <p className="UTIL__section_subtitle">
      //       {subtitle}
      //     </p>
      //   </SparkScroll.div>
      // </SparkProxy.div>
