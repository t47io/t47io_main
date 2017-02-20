import fs from 'fs';
import sass from 'node-sass';
import path from 'path';

const env = require('../config/server.json');

const googleAnalytics = { trackingID: env.gaTracker };

const helixLoading = {
  CSS: sass.renderSync({
    file: path.join(__dirname, '../app/loading/scss/async.scss'),
    outputStyle: 'compressed',
  }).css.toString(),
  HTML: `
    <div class="LOAD__container UTIL__image-RNA">
      <div class="LOAD__content">
        <a href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" class="LOAD__logo green-white">
          ${fs.readFileSync('./app/common/img/t47_logo_alt.svg')}
        </a>
    
        <div class="row">
          <div class="LOAD__helix center-block" style="width:75%;">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div>
          </div>
        </div>
      </div>
    </div>`,
};


const commonMeta = [
  {
    name: 'author',
    content: 'Siqi Tian',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  },
  {
    name: 'robots',
    content: 'noodp, noydir',
  },
];
const indexPage = {
  title: 'SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO',
  meta: [
    {
      name: 'description',
      content: 'Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University.',
    },
    {
      name: 'keywords',
      content: 'Siqi Tian, Portfolio, Personal Website, Design, RNA, Full-Stack Developer, t47io',
    },
    ...commonMeta,
  ],
};
const errorPage = {
  title: 'SIQI TIAN - Error Page | T47.IO',
  meta: [
    {
      name: 'description',
      content: 'Custom HTTP error page for http://t47.io/, the personal portfolio of Siqi Tian.',
    },
    {
      name: 'keywords',
      content: 'Siqi Tian, Portfolio, Personal Website, Error Page',
    },
    ...commonMeta,
  ],
};


export {
  indexPage,
  errorPage,
  helixLoading,
  googleAnalytics,
};
