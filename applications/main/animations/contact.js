import { easeOutBack } from '../../common/animations/easing.js';
import { CONTACT_LEFT } from '../constants/sectionTypes.js';


export const contactItem = {
  keyframes: [
    { transform: 'rotateX(180deg) rotateZ(180deg) scale(2)', opacity: 0 },
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotateX(180deg) rotateZ(90deg) scale(0.5)' },
    { transform: 'rotate(0) scale(1)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 125,
    duration: 500,
    easing: easeOutBack,
    fill: 'both',
  }),
};

export const contactPanel = {
  keyframes: side => ([
    { transform: `translateX(${(side === CONTACT_LEFT) ? '-' : ''}100%) translateY(100%)`, opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ]),
  timing: index => ({
    delay: 1000 + index * 125,
    duration: 500,
    easing: 'linear',
    fill: 'both',
  }),
};
