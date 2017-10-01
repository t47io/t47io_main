import React from 'react';
import PropTypes from 'prop-types';

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
  title: PropTypes.string,
  intro: PropTypes.bool,
  color: PropTypes.number,
  server: PropTypes.bool,
};
HomeDescription.defaultProps = {
  title: '',
  intro: false,
  color: 0,
  server: false,
};


export default HomeDescription;
