import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import _ from 'lodash/core';
import path from 'path';
import request from 'request';


const json = require('../config/index/pubs.json');

const filter = /[a-zA-Z]+/g;
const filterWords = (input, minLen, exclude = [], subset = NaN) => {
  let output = input.match(filter)
    .map((word) => word.toLowerCase())
    .filter((word) => (word.length > minLen && exclude.indexOf(word) === -1));
  if (!isNaN(subset)) { output = output.slice(0, subset); }
  output.sort();
  return output;
};


const extractHTML = (body) => {
  let $html = cheerio.load(body);
  $html = $html.html("#gsc_a_b");
  let $ = cheerio.load($html);

  let allRecords = [];

  $("tr").each(function() {
    const title = filterWords($(this).find("td.gsc_a_t a").text(), 4);
    const author = filterWords($(this).find("td.gsc_a_t div.gs_gray").first().text(), 2, ['and'], 6);
    const year = parseInt($(this).find("span.gsc_a_h").text(), 10);
    const cite = parseInt($(this).find("td.gsc_a_c a.gsc_a_ac").text(), 10);
    allRecords.push({title, author, year, cite});
  });

  return allRecords;
};

const matchRecords = (allRecords) => {
  let newJson = _.clone(json);
  let restRecords = _.clone(allRecords);

  newJson.items = json.items.map((item) => {

    item.items = item.items.map((item) => {
      let title = filterWords(item.title, 4);
      let author = filterWords(item.author, 2, ['and'], 6);
      item.citation = null;
      
      for (let i = 0; i < restRecords.length; i++) {
        if (_.isEqual(restRecords[i].title, title) && _.isEqual(restRecords[i].author, author)) {
          item.citation = restRecords[i].cite;
          restRecords.splice(i, 1);
          break;
        }
      }
      return item;
    });

    return item; 
  });

  return {newJson, restRecords};
};


try {
  request(json.links.google_scholar, (error, response, body) => {
    const allRecords = extractHTML(body);
    let {newJson, restRecords} = matchRecords(allRecords);

    if (restRecords.length) {
      console.log(`${colors.yellow("WARNING")}: ${restRecords.length} record(s) from Google Scholar was not matched.`);
      restRecords.map((item) => console.log(`${colors.yellow("WARNING")}: entry ${item.year} / ${item.author.join()} / ${item.title.join(" ")}`));
    }
    fs.writeJsonSync(path.join(__dirname, '../config/index/pubs.json'), newJson);
    console.log(`${colors.green("SUCCESS")}: Google Scholar citation records updated.`);
  });
} catch (e) {
  console.log(e);
  console.log(`${colors.red("ERROR")}: Failed to update Google Scholar citation.`);
}
