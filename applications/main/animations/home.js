export const AVATAR_SVG_DRAW_DURATION = 50 * 50 + 500 * 7 + 1000;

const SHADE_FADE_DURATION = 750;
const SHADE_FADE_DELAY_1 = 1000;
const NAME_ZOOM_DURATION = 750;
const NAME_ZOOM_DELAY = SHADE_FADE_DELAY_1 + SHADE_FADE_DURATION + 500;
export const homeName = {
  keyframes: [
    { transform: 'scale(5)', opacity: 0, filter: 'blur(3em)' },
    { transform: 'scale(1)', opacity: 1, filter: 'none' },
  ],
  timing: {
    delay: NAME_ZOOM_DELAY,
    duration: NAME_ZOOM_DURATION,
    easing: 'linear',
    fill: 'both',
  },
};

export const TYPE_WRITER_DELAY = NAME_ZOOM_DELAY + SHADE_FADE_DURATION + 500;
export const TYPE_WRITER_SPEED = 125;

export const SHADE_FADE_DELAY_2 = TYPE_WRITER_DELAY + TYPE_WRITER_SPEED * 76 + 500;
const SHADE_FADE_OFFSET = SHADE_FADE_DURATION / SHADE_FADE_DELAY_2;
export const homeShade = {
  keyframes: [
    { backgroundColor: 'rgba(0, 7, 11, 0)' },
    { backgroundColor: 'rgba(0, 7, 11, 0.5)', offset: SHADE_FADE_OFFSET },
    { backgroundColor: 'rgba(0, 7, 11, 0.5)', offset: 1 - SHADE_FADE_OFFSET },
    { backgroundColor: 'rgba(0, 7, 11, 0.25)' },
  ],
  timing: {
    delay: SHADE_FADE_DELAY_1,
    duration: SHADE_FADE_DELAY_2,
    easing: 'linear',
    fill: 'both',
  },
};

export const HOME_TEXT_COLOR_INTERVAL = 2500;
