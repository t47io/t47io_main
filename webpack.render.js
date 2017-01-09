import fs from 'fs';
import sass from 'node-sass';


const CSS = sass.renderSync({
  file: `${__dirname}/app/components/loading/scss/async.scss`,
  outputStyle: 'compressed'
}).css.toString();

const logoAltSVG = fs.readFileSync('./app/components/common/img/t47_logo_alt.svg');
const HTML = `
  <div class="LOAD__container UTIL__image-RNA">
    <div class="LOAD__content">
      <a href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" class="LOAD__logo green-white">
        ${logoAltSVG}
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
  </div>
`;
const helixLoading = {CSS, HTML};


const title = "SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO";

const meta = [
  {
    name: "description",
    content: "Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University."
  },
  {
    name: "keywords",
    content: "Siqi Tian, Portfolio, Personal Website, Design, RNA, Full-Stack Developer, t47io"
  },
  {
    name: "author",
    content: "Siqi Tian"
  },
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  },
  {
    name: "robots",
    content: "noodp, noydir"
  }
];


const env = require('./server/config/env.json');
const googleAnalytics = {trackingID: env.ga_tracker};

export {title, meta, helixLoading, googleAnalytics};
