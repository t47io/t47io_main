export const DAY_MILLISECONDS = 1000 * 24 * 60 * 60;
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const TEXT_COLORS = [
  'white',
  'main-light',
  'main',
  'main-dark',
  'main',
  'main-light',
];
export const THEME_COLORS = [
  'green',
  'cyan',
  'purple',
];

export const AUTHOR_NAME = 'Tian S.';

export const MARKUP = '_';
export const FIELD_MARKUP = `${MARKUP}1st${MARKUP}`;

export const FORM_FIELDS = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Your Name',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'E-Mail',
  },
  {
    type: 'text',
    name: 'subject',
    placeholder: 'Subject',
  },
  {
    type: 'textarea',
    name: 'message',
    placeholder: 'Message',
    rows: 5,
  },
];
export const FORM_FIELD_DEFAULTS = {
  className: 'form-control input-lg',
  required: true,
};

export const EMAIL_ERROR_CODES = {
  400: 'Invalid Form Data',
  403: 'Illegal Form Data',
  500: 'Internal Server Error',
};

export const SVG_BG_INDICES = [0, 1, 2, 3];
export const AVATAR_INDICES = [1, 2, 3, 4];
