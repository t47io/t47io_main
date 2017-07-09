import colors from 'colors';

import { SITEMAP_HEAD } from '../config.js';
import { HOST } from '../../applications/config.js';
import { FILE_NAMES } from '../../server/config.js';
import { PROJECT_LIST } from '../../applications/project/constants/projectTypes.js';
import {
  resumeVersion,
  pubTags,
} from '../../server/util.js';
import { saveFileSync } from '../render/util.js';

const SCRIPT = 'process:sitemap';


const addRecord = (location, lastModify, changeFreq = 'never', priority = null) => {
  let urlXML = '<url>';
  urlXML += `<loc>${HOST}/${location}</loc>`;
  urlXML += `<lastmod>${lastModify}</lastmod>`;
  urlXML += `<changefreq>${changeFreq}</changefreq>`;
  if (priority !== null) {
    urlXML += `<priority>${priority.toFixed(1)}</priority>`;
  }
  urlXML += '</url>';
  return urlXML;
};


try {
  const homeDate = new Date().toISOString().slice(0, 10);
  const projectDate = `${homeDate.slice(0, 7)}-01`;
  const resumeDate = `${resumeVersion.slice(0, 4)}-${resumeVersion.slice(4, 6)}-${resumeVersion.slice(6, 8)}`;

  let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemapXML += `<urlset xmlns="${SITEMAP_HEAD.xmlns}" xmlns:xsi="${SITEMAP_HEAD.xsi}" xsi:schemaLocation="${SITEMAP_HEAD.xmlns} ${SITEMAP_HEAD.xmlns}/${SITEMAP_HEAD.schemaLocation}">`;

  sitemapXML += addRecord('', homeDate, 'weekly', 1);
  sitemapXML += addRecord('resume', resumeDate, 'montly', 0.8);
  PROJECT_LIST.forEach((project) => {
    sitemapXML += addRecord(`project/${project}`, projectDate, 'monthly');
  });
  pubTags.forEach((pub) => {
    const year = parseInt(pub.slice(0, 4), 10);
    const changefreq = (new Date().getFullYear() === year) ? 'yearly' : 'never';
    sitemapXML += addRecord(`pdf/${pub}`, `${year}-01-01`, changefreq);
  });
  Object.keys(FILE_NAMES.THESIS).forEach((item) => {
    sitemapXML += addRecord(`phd/${FILE_NAMES.THESIS[item]}`, '2017-01-01');
  });
  sitemapXML += '</urlset>';

  saveFileSync(`public/${FILE_NAMES.SITEMAP}`, sitemapXML);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Sitemap XML file generated.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to generate sitemap XML file.`);
  process.exit(1);
}
