export const AVATAR_SVG_DRAW_DURATION = 50 * 50 + 500 * 4 + 1000;

const FADE_DURATION = 750;
const SHADE_FADE_START = AVATAR_SVG_DRAW_DURATION + 1000;
const NAME_ZOOM_DURATION = SHADE_FADE_START + FADE_DURATION + 500;
const NAME_OFFSET = SHADE_FADE_START / NAME_ZOOM_DURATION;
export const homeName = {
  keyframes: [
    { transform: 'scale(5)', opacity: 0, filter: 'none' },
    // eslint-disable-next-line object-curly-newline
    { transform: 'scale(5)', opacity: 0, filter: 'blur(3em)', offset: NAME_OFFSET },
    { transform: 'scale(1)', opacity: 1, filter: 'none' },
  ],
  timing: {
    delay: FADE_DURATION,
    duration: NAME_ZOOM_DURATION,
    easing: 'linear',
    fill: 'both',
  },
};

export const TYPE_WRITER_DELAY = NAME_ZOOM_DURATION + FADE_DURATION + 500;
export const TYPE_WRITER_SPEED = 125;

const SHADE_FADE_END = TYPE_WRITER_DELAY + TYPE_WRITER_SPEED * 76 + 500;
export const SHADE_FADE_DURATION = SHADE_FADE_END - AVATAR_SVG_DRAW_DURATION;
const SHADE_FADE_OFFSET = FADE_DURATION / SHADE_FADE_DURATION;
export const homeShade = {
  keyframes: [
    { backgroundColor: 'rgba(0, 7, 11, 0)' },
    { backgroundColor: 'rgba(0, 7, 11, 0.5)', offset: SHADE_FADE_OFFSET },
    { backgroundColor: 'rgba(0, 7, 11, 0.5)', offset: 1 - SHADE_FADE_OFFSET },
    { backgroundColor: 'rgba(0, 7, 11, 0.25)' },
  ],
  timing: {
    delay: SHADE_FADE_START,
    duration: SHADE_FADE_DURATION,
    easing: 'linear',
    fill: 'both',
  },
};

export const COLOR_CYCLER_INTERVAL = 2500;
