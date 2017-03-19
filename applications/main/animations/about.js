import { easeOutBack } from '../../common/animations/easing.js';


export const aboutItem = {
  keyframes: [
    { transform: 'rotateZ(180deg)', opacity: 0 },
    { transform: 'rotate(0)' },
    { transform: 'rotateZ(-180deg)' },
    { transform: 'rotate(45deg)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 250,
    duration: 500,
    easing: easeOutBack,
    fill: 'both',
  }),
};
