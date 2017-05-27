import axios from 'axios';
import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';

const json = require('../../config/main/pubs.json');
const cron = require('../../config/cron.json');


const wordRegex = /[a-zA-Z]+/g;
const isEqual = (array1, array2) => (
  array1.length === array2.length &&
  array1.toString() === array2.toString()
);

const filterWords = (input, minLen, exclude = [], subset = NaN) => {
  let output = input.match(wordRegex)
    .map(word => word.toLowerCase())
    .filter(word => (word.length > minLen && exclude.indexOf(word) === -1));
  if (!isNaN(subset)) { output = output.slice(0, subset); }
  return output.sort();
};

const extractHTML = (body) => {
  const $html = cheerio.load(body).html('#gsc_a_b');
  const $ = cheerio.load($html);

  return $('tr').map((i, tr) => ({
    title: filterWords($(tr).find('td.gsc_a_t a').text(), 4),
    author: filterWords($(tr).find('td.gsc_a_t div.gs_gray').first().text(), 2, ['and'], 6),
    year: parseInt($(tr).find('span.gsc_a_h').text(), 10),
    cite: parseInt($(tr).find('td.gsc_a_c a.gsc_a_ac').text(), 10) || null,
  })).get();
};

const matchRecords = allRecords => ({
  ...json,
  items: json.items.map(obj => ({
    ...obj,
    items: obj.items.map((item) => {
      const title = filterWords(item.title, 4);
      const author = filterWords(item.authors.join(' '), 2, ['and'], 6);
      let citation = null;

      for (let i = 0; i < allRecords.length; i += 1) {
        if (isEqual(allRecords[i].title, title) &&
          isEqual(allRecords[i].author, author)) {
          citation = allRecords[i].cite;
          allRecords.splice(i, 1);
          break;
        }
      }
      return {
        ...item,
        citation,
      };
    }),
  })),
});

const flattenCitations = items => (
  items.map(obj => (
    obj.items.map(item => ({
      [item.tag]: item.citation,
    }))
    .reduce((dict, item) => ({
      ...dict,
      ...item,
    }), {})
  ))
  .reduce((dict, item) => ({
    ...dict,
    ...item,
  }), {})
);

const diffCitations = (oldCitations, newCitations) => {
  const citations = {};

  Object.keys(newCitations).forEach((tag) => {
    if (newCitations[tag] !== null) {
      const diffNumber = newCitations[tag] - (parseInt(oldCitations[tag], 10) || 0);
      const diffString = (diffNumber > 0) ? ` (+${diffNumber})` : '';
      citations[tag] = `${newCitations[tag]}${diffString}`;
    } else {
      citations[tag] = null;
    }
  });
  return citations;
};


try {
  axios.get(json.links.googleScholar)
  .then((response) => {
    const allRecords = extractHTML(response.data);
    const newJson = matchRecords(allRecords);

    if (allRecords.length) {
      console.log(`${colors.yellow('WARNING')}: ${allRecords.length} record(s) from Google Scholar was not matched.`);
      allRecords.forEach(item => (
        console.log(`${colors.yellow('WARNING')}: entry ${item.year} / ${item.author.join()} / ${item.title.join(' ')}`)
      ));
    }

    newJson.items.forEach((obj) => {
      obj.items.filter(item => (item.citation === null))
      .forEach(item => (
        console.log(`${colors.blue('NOTICE')}: entry ${item.tag} did not match any citation record.`)
      ));
    });

    fs.writeJsonSync(path.join(__dirname, '../../config/main/pubs.json'), newJson);
    return Promise.resolve(newJson.items);
  })
  .then((items) => {
    const oldCitations = cron.citations;
    const newCitations = flattenCitations(items);

    const newJson = {
      ...cron,
      citations: diffCitations(oldCitations, newCitations),
    };
    fs.writeJsonSync(path.join(__dirname, '../../config/cron.json'), newJson);

    console.log(`${colors.green('SUCCESS')}: Google Scholar citation records updated.`);
  })
  .catch((error) => {
    console.error(error);
    console.log(`${colors.red('ERROR')}: Failed to retrieve Google Scholar citation.`);
  });
} catch (err) {
  console.error(err);
  console.log(`${colors.red('ERROR')}: Failed to update Google Scholar citation.`);
}
