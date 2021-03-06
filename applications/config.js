import {
  GITHUB,
  FILE_NAMES,
} from '../server/config.js';


export const GITHUB_HOST = GITHUB.HOST;

export const HOST = 'https://t47.io';
export const EMAIL = 'contact@t47.io';

export const META = {
  charset: 'utf-8',
  name: {
    author: 'Siqi Tian',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    google: 'notranslate',
  },
};

export const LINK = {
  rel: {
    'dns-prefetch': '//www.google-analytics.com',
    'shortcut icon': `/${FILE_NAMES.FAVICO}`,
  },
};

export const TITLE = 'SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO';
export const DESCRIPTION = 'Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University.';

export const LICENSE = 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
export const REPOSITORY = `${GITHUB_HOST}t47io/t47io_main/`;

export const ERROR_COLOR_CODES = ['green', 'blue', 'yellow', 'purple', 'red'];
