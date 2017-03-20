import React from 'react';
import Waypoint from 'react-waypoint';


const AffiliationScrollSpy = ({
  years,
  delay,
  topOffset,
  bottomOffset,
  onToggleAnimation,
  debug,
  className,
  children,
}) => (
  <Waypoint
    topOffset={topOffset}
    bottomOffset={bottomOffset}
    onPositionChange={({ waypointTop }) => {
      // const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      // const parentHeight = document.querySelector('.AFFILIATION__story')
      console.log(waypointTop);
    }}
  >
    <div className={className} style={{border: '1px solid red'}}>
      {children}
    </div>
  </Waypoint>
);

AffiliationScrollSpy.propTypes = {
  years: React.PropTypes.arrayOf(React.PropTypes.number),
  delay: React.PropTypes.number,
  topOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  bottomOffset: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onToggleAnimation: React.PropTypes.func,
  debug: React.PropTypes.bool,
};
AffiliationScrollSpy.defaultProps = {
  years: [],
  delay: 250,
  topOffset: 0,
  bottomOffset: 0,
  onToggleAnimation: () => {},
  debug: false,
};


export default AffiliationScrollSpy;
