import React from 'react';

import TypeWriter from '../../common/components/TypeWriter.jsx';

import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';


const HomeDescription = ({
  title,
  intro,
  color,
  server,
}) => {
  if (server) {
    const displayHTML = title.replace(/!/g, '').replace(/@/g, '<br/>');
    return (
      <p
        className="HOME__typewrite text-main-light"
        dangerouslySetInnerHTML={{ __html: displayHTML }}
      />
    );
  }

  const textColorClass = `text-${TEXT_COLOR_CYCLE[color]}`;

  return (
    <TypeWriter
      className={`HOME__typewrite ${textColorClass}`}
      cursorClassName="HOME__cursor"
      fullText={title}
      delay={1250}
      shouldAnimate={intro}
    />
  );
};

HomeDescription.propTypes = {
  title: React.PropTypes.string,
  intro: React.PropTypes.bool,
  color: React.PropTypes.number,
  server: React.PropTypes.bool,
};
HomeDescription.defaultProps = {
  title: '',
  intro: false,
  color: 0,
  server: false,
};


export default HomeDescription;
