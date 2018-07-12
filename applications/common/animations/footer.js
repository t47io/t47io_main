import { easeInOutCirc } from './easing.js';
import { FOOTER_LEFT } from '../constants/sectionTypes.js';


export const footerHeader = {
  keyframes: [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ],
  timing: {
    delay: 750,
    duration: 1000,
    easing: easeInOutCirc,
    fill: 'both',
  },
};

export const footerGif = {
  keyframes: side => ([
    { transform: `translateX(${(side === FOOTER_LEFT) ? '-' : ''}100%)`, opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ]),
  timing: {
    delay: 500,
    duration: 1000,
    easing: easeInOutCirc,
    fill: 'both',
  },
};
