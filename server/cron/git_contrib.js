import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import _ from 'lodash/core';
import path from 'path';
import request from 'request';


const json = require('../../config/index/stats.json');
const gridColors = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];


const extractData = (body) => {
  let $html = cheerio.load(body);
  $html = $html.html(".js-calendar-graph-svg");
  let $ = cheerio.load($html);

  const data = {};
  $("rect").each(function() {
    data[$(this).attr('data-date')] = parseInt($(this).attr('data-count'), 10);
  });
  return data;
};

const modifyHTML = (body, thisAcctStats, otherAcctStats) => {
  let $html = cheerio.load(body);
  $html = $html.html(".js-calendar-graph-svg");
  let $ = cheerio.load($html);

  $("svg").attr('height', 150).removeAttr('class');
  $("rect").each(function() {
    $(this).addClass(`day day_${gridColors.indexOf($(this).attr('fill'))}`);

    if ($(this).attr('data-count') !== "0") {
      const dateKey = $(this).attr('data-date');
      const dataCount = thisAcctStats[dateKey] + otherAcctStats[dateKey];

      $(this).attr('data-for', 'STATS__tooltip');
      $(this).attr('data-tip', `${dataCount} contribution${dataCount === 1 ? "" : "s"} on ${dateKey}`);
    }
    $(this).removeAttr('height').removeAttr('width').removeAttr('fill').removeAttr('data-count').removeAttr('data-date');
  });

  $("svg > g").append(`
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
  request(json.links["github-other"], (error, response, body) => {
    const otherData = extractData(body);
    request(json.links.github, (error, response, body) => {
      const thisData = extractData(body);

      let newJson = _.clone(json);
      newJson.git = modifyHTML(body, thisData, otherData).replace(/\n[ ]+/g, '');
      fs.writeJsonSync(path.join(__dirname, '../../config/index/stats.json'), newJson);

      console.log(`${colors.green("SUCCESS")}: GitHub contribution records updated.`);
    });
  });
} catch (e) {
  console.log(e);
  console.log(`${colors.red("ERROR")}: Failed to update GitHub contribution records.`);
}
