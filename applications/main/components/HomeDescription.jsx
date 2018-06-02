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

/* eslint-disable */
import cssType from '../../common/mixins/typography.scss';
import cssHome from '../stylesheets/HomeSection.scss';
/* eslint-enable */


const HomeDescription = ({
  title,
  shouldAnimate,
  shouldCycle,
  isServer,
}) => {
  const displayHTML = formatHomeText(title);
  if (isServer) {
    return (
      <p
        styleName="cssHome.HOME__typewrite cssType.text-main-light"
        dangerouslySetInnerHTML={{ __html: displayHTML }}
      />
    );
  } else if (shouldCycle) {
    return (
      <ColorCycler
        styleName="cssHome.HOME__typewrite"
        fullText={displayHTML}
        choices={TEXT_COLORS}
        interval={COLOR_CYCLER_INTERVAL}
        isActive
      />
    );
  }

  return (
    <TypeWriter
      styleName="cssHome.HOME__typewrite"
      cursorClassName={cssHome.HOME__cursor}
      cursorBlinkClassName={cssHome.blink}
      cursorHiddenClassName={cssHome.hidden}
      fullText={title}
      delay={TYPE_WRITER_DELAY}
      interval={TYPE_WRITER_SPEED}
      shouldAnimate={shouldAnimate}
    />
  );
};

HomeDescription.propTypes = {
  title: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  shouldCycle: PropTypes.bool,
  isServer: PropTypes.bool,
};
HomeDescription.defaultProps = {
  title: '',
  shouldAnimate: false,
  shouldCycle: false,
  isServer: false,
};


export default HomeDescription;
