import axios from 'axios';
import cheerio from 'cheerio';
import colors from 'colors';

import {
  readJsonFile,
  writeJsonFile,
} from '../util.js';
import logger from '../logger.js';

import pubsJSON from '../../config/main/pubs.json';

const log = logger('cron:scholar');


const wordRegex = /[a-zA-Z]+/g;
const isEqual = (array1, array2) => (
  array1.length === array2.length && array1.toString() === array2.toString()
);

const filterWords = (input, minLen, exclude = [], subset = NaN) => {
  let output = input.match(wordRegex)
    .map(word => word.toLowerCase())
    .filter(word => (word.length > minLen && !exclude.includes(word)));
  if (!Number.isNaN(subset)) { output = output.slice(0, subset); }
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
  ...pubsJSON,
  items: pubsJSON.items.map((item) => {
    const title = filterWords(item.title, 4);
    const author = filterWords(item.authors.join(' '), 2, ['and'], 6);
    let citation = null;

    for (let i = 0; i < allRecords.length; i += 1) {
      if (isEqual(allRecords[i].title, title) && isEqual(allRecords[i].author, author)) {
        citation = allRecords[i].cite;
        allRecords.splice(i, 1);
        log.debug(`scholar entry ${colors.blue(item.tag)} matched citation record (${colors.red(citation)}).`);
        break;
      }
    }
    return {
      ...item,
      citation,
    };
  }),
});

const flattenCitations = items => (
  Object.fromEntries(items.map(item => ([
    item.tag,
    item.citation,
  ])))
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


(async () => {
  try {
    const result = await axios.get(pubsJSON.links.googleScholar);
    const allRecords = extractHTML(result.data);
    const newPubsJSON = matchRecords(allRecords);

    if (allRecords.length) {
      log.warn(`${allRecords.length} record(s) from Google Scholar was not matched:`);
      allRecords.forEach(item => (
        log.warn(`scholar entry ${colors.blue(item.year)} | ${colors.blue(item.author.join())} | ${colors.blue(item.title.join(' '))}`)
      ));
    }

    newPubsJSON.items.filter(item => (item.citation === null))
    .forEach((item) => {
      log.warn(`pubs entry ${colors.blue(item.tag)} did not match any citation record.`);
    });
    await writeJsonFile('main/pubs.json', newPubsJSON);

    const cronJSON = await readJsonFile('cron.json');
    const oldCitations = cronJSON.citations;
    const newCitations = flattenCitations(newPubsJSON.items);
    const newCronJSON = {
      ...cronJSON,
      citations: diffCitations(oldCitations, newCitations),
    };
    await writeJsonFile('cron.json', newCronJSON);

    log.info('Google Scholar citation records updated.');
  } catch (err) {
    console.error(err);
    log.error('Failed to update Google Scholar citation.');
    process.exit(1);
  }
})();
