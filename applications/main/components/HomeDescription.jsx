import React from 'react';
import PropTypes from 'prop-types';

import ColorCycler from '../../common/components/ColorCycler.jsx';
import TypeWriter from '../../common/components/TypeWriter.jsx';

import { TEXT_COLORS } from '../constants/util.js';
import {
  TYPE_WRITER_DELAY,
  TYPE_WRITER_SPEED,
  COLOR_CYCLER_INTERVAL,
} from '../animations/home.js';
import { formatHomeText } from '../util.js';


const HomeDescription = ({
  title,
  intro,
  color,
  server,
}) => {
  const displayHTML = formatHomeText(title);
  if (server) {
    return (
      <p
        className="HOME__typewrite text-main-light"
        dangerouslySetInnerHTML={{ __html: displayHTML }}
      />
    );
  } else if (color) {
    return (
      <ColorCycler
        className="HOME__typewrite"
        fullText={displayHTML}
        choices={TEXT_COLORS}
        interval={COLOR_CYCLER_INTERVAL}
        isActive
      />
    );
  }

  return (
    <TypeWriter
      className="HOME__typewrite"
      cursorClassName="HOME__cursor"
      fullText={title}
      delay={TYPE_WRITER_DELAY}
      interval={TYPE_WRITER_SPEED}
      shouldAnimate={intro}
    />
  );
};

HomeDescription.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.bool,
  color: PropTypes.bool,
  server: PropTypes.bool,
};
HomeDescription.defaultProps = {
  title: '',
  intro: false,
  color: false,
  server: false,
};


export default HomeDescription;
