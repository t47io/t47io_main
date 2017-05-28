
export const homeName = {
  keyframes: [
    { transform: 'scale(5)', opacity: 0, filter: 'blur(3em)' },
    { transform: 'scale(1)', opacity: 1, filter: 'none' },
  ],
  timing: {
    duration: 750,
    easing: 'linear',
    fill: 'both',
  },
};

export const homeShade = {
  keyframes: [
    { backgroundColor: 'rgba(0, 7, 11, 0.5)' },
    { backgroundColor: 'rgba(0, 7, 11, 0.25)' },
  ],
  timing: {
    delay: 76 * 125 + 1250,
    duration: 750,
    easing: 'linear',
    fill: 'both',
  },
};
