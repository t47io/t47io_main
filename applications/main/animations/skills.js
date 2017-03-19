import { easeInBack } from '../../common/animations/easing.js';
import { SKILLS_LEFT } from '../constants/sectionTypes.js';


export const skillsItem = {
  keyframes: side => ([
    { transform: `translateX(${(side === SKILLS_LEFT) ? '-' : ''}150%) scale(2)`, opacity: 0.25 },
    { transform: 'translate(0) scale(1)', opacity: 1 },
  ]),
  timing: index => ({
    delay: index * 125,
    duration: 1000,
    easing: easeInBack,
    fill: 'both',
  }),
};
