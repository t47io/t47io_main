export const HTTP_CODES = [201, 400, 401, 403, 404, 405, 500, 502, 503];
export const HTML_HEADER = {
  'Content-Type': 'text/html; charset=UTF-8',
  'X-UA-Compatible': 'IE=edge',
  'X-Robots-Tag': 'index, follow, noarchive, nocache, notranslate',
};
export const CACHE_MAX_AGE = 120;

export const GITHUB = {
  HOST: 'https://github.com/',
  API: 'https://api.github.com/repos/',
  RETRY: 5,
  INTERVAL: 1000,
  TABLE_LIMIT: 4,
  DEFUALT_AUTHOR: '(None)',
};
export const RIBOKIT = 'https://ribokit.github.io/';

export const JSON_FORMAT = { spaces: 2 };

export const FILE_NAMES = {
  FAVICO: 't47_icon.png',
  RESUME: 'SiqiTian_resume.pdf',
  THESIS: {
    dissertation: 'dissertation.pdf',
    figures: 'dissertation_figures.zip',
    slides: 'defense_slides.pdf',
    flyer: 'defense_flyer.png',
  },
  ROBOTS: 'robots.txt',
  SITEMAP: 'sitemap.xml',
  BACKUP: 'backup.tar.gz',
};

export const EMAIL_VALID_LEN = {
  name: 3,
  email: 8,
  subject: 10,
  message: 20,
};
