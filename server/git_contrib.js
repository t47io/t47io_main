import cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';
import request from 'request';


const json = require('../config/index/stats.json');
const colors = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];


request(json.links.github, (error, response, body) => {
  let $html = cheerio.load(body);
  $html = $html.html(".js-calendar-graph-svg");
  let $ = cheerio.load($html);

  $("svg").attr('height', 150).removeAttr('class');
  $("rect").each(function() {
    $(this).addClass(`day day_${colors.indexOf($(this).attr('fill'))}`);

    if ($(this).attr('data-count') !== "0") {
      $(this).attr('data-for', 'STATS__tooltip');
      $(this).attr('data-tip', `${$(this).attr('data-count')} contribution${$(this).attr('data-count') === "1" ? "" : "s"} on ${$(this).attr('data-date')}`);
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

  
  json.git = $.html();
  fs.writeJsonSync(path.join(__dirname, '../config/index/stats.json'), json);
});
