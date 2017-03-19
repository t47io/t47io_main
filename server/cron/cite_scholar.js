import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import _ from 'lodash/core';
import path from 'path';
import request from 'request';


const json = require('../../config/main/pubs.json');

const filter = /[a-zA-Z]+/g;
const filterWords = (input, minLen, exclude = [], subset = NaN) => {
  let output = input.match(filter)
    .map(word => word.toLowerCase())
    .filter(word => (word.length > minLen && exclude.indexOf(word) === -1));
  if (!isNaN(subset)) { output = output.slice(0, subset); }
  output.sort();
  return output;
};


const extractHTML = (body) => {
  let $html = cheerio.load(body);
  $html = $html.html('#gsc_a_b');
  const $ = cheerio.load($html);

  const allRecords = [];
  $('tr').each(function () {
    const title = filterWords($(this).find('td.gsc_a_t a').text(), 4);
    const author = filterWords($(this).find('td.gsc_a_t div.gs_gray').first().text(), 2, ['and'], 6);
    const year = parseInt($(this).find('span.gsc_a_h').text(), 10);
    const cite = parseInt($(this).find('td.gsc_a_c a.gsc_a_ac').text(), 10);
    allRecords.push({ title, author, year, cite });
  });
  return allRecords;
};

const matchRecords = (allRecords) => {
  const newJson = _.clone(json);
  const restRecords = _.clone(allRecords);

  newJson.items = json.items.map((obj) => {
    const updatedObj = _.clone(obj);

    updatedObj.items = obj.items.map((item) => {
      const title = filterWords(item.title, 4);
      const author = filterWords(item.author, 2, ['and'], 6);
      const newItem = _.clone(item);
      newItem.citation = null;

      for (let i = 0; i < restRecords.length; i += 1) {
        if (_.isEqual(restRecords[i].title, title) &&
          _.isEqual(restRecords[i].author, author)) {
          newItem.citation = restRecords[i].cite;
          restRecords.splice(i, 1);
          break;
        }
      }
      return newItem;
    });
    return updatedObj;
  });

  return { newJson, restRecords };
};


try {
  request(json.links.googleScholar, (error, response, body) => {
    if (error) {
      console.log(`${colors.red('ERROR')}: Failed to retrieve Google Scholar citation.`);
      console.log(error);
      return;
    }

    const allRecords = extractHTML(body);
    const { newJson, restRecords } = matchRecords(allRecords);

    if (restRecords.length) {
      console.log(`${colors.yellow('WARNING')}: ${restRecords.length} record(s) from Google Scholar was not matched.`);
      restRecords.map(item => console.log(`${colors.yellow('WARNING')}: entry ${item.year} / ${item.author.join()} / ${item.title.join(' ')}`));
    }
    fs.writeJsonSync(path.join(__dirname, '../../config/index/pubs.json'), newJson);
    console.log(`${colors.green('SUCCESS')}: Google Scholar citation records updated.`);
  });
} catch (err) {
  console.log(`${colors.red('ERROR')}: Failed to update Google Scholar citation.`);
  console.log(err);
}
