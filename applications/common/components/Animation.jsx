import React from 'react';
// import { Motion } from 'react-motion';


const Animation = ({
  beginStyle,
  endStyle,
  hasAnimated,
  children,
}) => {
  const targetStyle = hasAnimated ? endStyle : beginStyle;
  console.log(hasAnimated, targetStyle);

  return (
    <div style={{ ...targetStyle, transition: 'all 2s ease' }}>
      {children}
    </div>
  );
};

Animation.propTypes = {
  beginStyle: React.PropTypes.object.isRequired,
  endStyle: React.PropTypes.object.isRequired,
  hasAnimated: React.PropTypes.bool.isRequired,
};


export default Animation;
