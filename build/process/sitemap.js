import colors from 'colors';

import { SITEMAP_HEAD } from '../config.js';
import { HOST } from '../../applications/config.js';
import { FILE_NAMES } from '../../server/config.js';
import { PROJECT_LIST } from '../../applications/project/constants/projectTypes.js';
import { saveFileSync } from '../render/util.js';

const json = require('../../config/main.json');


const getPublications = () => (
  json.pubs.items.map(obj => (
    obj.items.map(item => item.tag)
  ))
  .reduce((list, item) => ([
    ...list,
    ...item,
  ]), [])
);

const addRecord = (location, lastModify, changeFreq) => {
  let urlXML = '<url>';
  urlXML += `<loc>${HOST}/${location}</loc>`;
  urlXML += `<lastmod>${lastModify}</lastmod>`;
  urlXML += `<changefreq>${changeFreq}</changefreq>`;
  urlXML += '</url>';
  return urlXML;
};


try {
  const homeDate = new Date().toISOString().slice(0, 10);
  const projectDate = `${homeDate.slice(0, 7)}-01`;
  const resume = json.contact.resume.replace(/[a-zA-Z_.]/g, '');
  const resumeDate = `${resume.slice(0, 4)}-${resume.slice(4, 6)}-${resume.slice(6, 8)}`;

  let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemapXML += `<urlset xmlns="${SITEMAP_HEAD.xmlns}" xmlns:xsi="${SITEMAP_HEAD.xsi}" xsi:schemaLocation="${SITEMAP_HEAD.xmlns} ${SITEMAP_HEAD.xmlns}/${SITEMAP_HEAD.schemaLocation}">`;

  sitemapXML += addRecord('', homeDate, 'weekly');
  sitemapXML += addRecord('resume', resumeDate, 'montly');
  PROJECT_LIST.forEach((project) => {
    sitemapXML += addRecord(`project/${project}`, projectDate, 'monthly');
  });
  getPublications().forEach((pub) => {
    const year = parseInt(pub.slice(0, 4), 10);
    sitemapXML += addRecord(`pdf/${pub}.pdf`, `${year}-01-01`, 'yearly');
  });
  sitemapXML += '</urlset>';

  saveFileSync(`public/${FILE_NAMES.SITEMAP}`, sitemapXML);
  console.log(`${colors.green('SUCCESS')}: Sitemap XML file generated.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to generate sitemap XML file.`);
}
