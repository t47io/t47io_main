import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import _ from 'lodash/core';
import path from 'path';
import request from 'request';

const json = require('../../config/index/stats.json');


const extractData = (body) => {
  let $html = cheerio.load(body);
  $html = $html.html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  const data = {};
  $('rect').each(function () {
    data[$(this).attr('data-date')] = parseInt($(this).attr('data-count'), 10);
  });
  return data;
};
const combineData = (data1, data2) => {
  const combined = {};
  let maxVal = 0;
  Object.keys(data1).forEach((key) => {
    combined[key] = data1[key] + data2[key];
    maxVal = Math.max(maxVal, combined[key]);
  });
  return [combined, maxVal];
};

const modifyHTML = (body, combinedAcctStats, maxContrib) => {
  let $html = cheerio.load(body);
  $html = $html.html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  $('svg').attr('height', 150)
    .removeAttr('class');
  $('rect').each(function () {
    const dateKey = $(this).attr('data-date');
    const dataCount = combinedAcctStats[dateKey];
    const dayIdx = (dataCount === 0) ? 0 : Math.floor(dataCount / maxContrib * 5 + 1);

    $(this).addClass(`day day_${Math.min(dayIdx, 4)}`);
    if (dataCount) {
      $(this).attr('data-for', 'STATS__tooltip');
      $(this).attr('data-tip', `${dataCount} contribution${dataCount === 1 ? '' : 's'} on ${dateKey}`);
    }
    $(this).removeAttr('height')
      .removeAttr('width')
      .removeAttr('fill')
      .removeAttr('data-count')
      .removeAttr('data-date');
  });

  $('svg > g').append(`
    <text x="0" y="120" ># Includes contributions from <tspan style="font-style:italic;">private</tspan> repositories</text>
    <g transform="translate(572, 108)" id="legend">
      <rect class="day day_0" x="0" />
      <rect class="day day_1" x="13" />
      <rect class="day day_2" x="26" />
      <rect class="day day_3" x="39" />
      <rect class="day day_4" x="52" />
    </g>
    <text x="534" y="118" class="legend">Less</text>
    <text x="646" y="118" class="legend">More</text>
  `);

  return $.html();
};


try {
  request(json.links.githubMinted, (error, response, body) => {
    if (error) {
      console.log(`${colors.red('ERROR')}: Failed to retrieve ${json.links.githubMinted}`);
      console.log(error);
      return;
    }
    const otherData = extractData(body);

    request(json.links.github, (error2, response2, body2) => {
      if (error2) {
        console.log(`${colors.red('ERROR')}: Failed to retrieve ${json.links.github}`);
        console.log(error2);
        return;
      }
      const thisData = extractData(body2);
      const [allData, maxContrib] = combineData(thisData, otherData);

      const newJson = _.clone(json);
      newJson.gitSvg = modifyHTML(body2, allData, maxContrib).replace(/\n[ ]+/g, '');
      fs.writeJsonSync(path.join(__dirname, '../../config/index/stats.json'), newJson);
      console.log(`${colors.green('SUCCESS')}: GitHub contribution records updated.`);
    });
  });
} catch (err) {
  console.log(`${colors.red('ERROR')}: Failed to update GitHub contribution records.`);
  console.log(err);
}
