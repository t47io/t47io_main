export const pubsItem = {
  keyframes: [
    { transform: 'rotateX(90deg)', opacity: 0.25 },
    { transform: 'rotate(0)' },
    { transform: 'rotateX(-90deg)' },
    { transform: 'rotate(0)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 125,
    duration: 500,
    easing: 'linear',
    fill: 'both',
  }),
};

export const pubsYear = {
  keyframes: [
    { transform: 'rotateX(90deg) scale(3)', opacity: 0.25 },
    { transform: 'rotateX(-90deg) scale(2)' },
    { transform: 'rotate(0) scale(1)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 125,
    duration: 500,
    easing: 'linear',
    fill: 'both',
  }),
};

export const pubsThesis = {
  keyframes: [
    { filter: 'blur(3em)', opacity: 0.25 },
    { filter: 'none', opacity: 1 },
  ],
  timing: {
    delay: 500,
    duration: 250,
    easing: 'linear',
    fill: 'both',
  },
};
