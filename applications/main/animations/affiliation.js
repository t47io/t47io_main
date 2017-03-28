import { easeInOutBack } from '../../common/animations/easing.js';


export const affiliationPanel = {
  keyframes: reversed => (reversed ? [
    { transform: 'translateX(-100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ] : [
    { transform: 'translate(0)', opacity: 1 },
    { transform: 'translateX(100%)', opacity: 0 },
  ]),
  timing: {
    duration: 750,
    easing: easeInOutBack,
    fill: 'both',
  },
};
