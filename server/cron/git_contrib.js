import axios from 'axios';
import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';

import { PATH } from '../env.js';
import {
  GITHUB,
  JSON_FORMAT,
} from '../config.js';

import statsJSON from '../../config/main/stats.json';
import cronJSON from '../../config/cron.json';

const SCRIPT = 'cron:contrib';


const extractData = (body) => {
  const $html = cheerio.load(body).html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  return {
    startDate: $('rect.day').first().attr('data-date'),
    countArray: $('rect.day').map((i, rect) => (
      parseInt($(rect).attr('data-count'), 10)
    )).get(),
    monthText: $('text.month').map((i, month) => ({
      [$(month).text()]: parseInt($(month).attr('x'), 10),
    })).get()
    .reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {}),
  };
};

const combineData = (data1, data2) => {
  if (data1.startDate !== data2.startDate) {
    console.log(`${colors.magenta(`[${SCRIPT}]`)} Failed to update GitHub contribution records.`);
    throw new Error('Date mismatch on GitHub contribution data.');
  } else if (data1.countArray.length !== data2.countArray.length) {
    console.log(`${colors.magenta(`[${SCRIPT}]`)} Failed to update GitHub contribution records.`);
    throw new Error('countArray length mismatch on GitHub contribution data.');
  }

  const combinedData = {
    startDate: data1.startDate,
    countArray: data1.countArray.map((count, i) => (
      count + data2.countArray[i]
    )),
    indexArray: [],
    maxCount: 0,
    monthText: data1.monthText,
  };

  const maxCount = Math.max(...combinedData.countArray);
  combinedData.indexArray = combinedData.countArray.map(count => (
    (count === 0) ? 0 : Math.min(Math.floor(count / maxCount * 5 + 1), 4)
  ));
  combinedData.maxCount = maxCount;

  return combinedData;
};


try {
  axios.all([
    axios.get(`${GITHUB.HOST}/${statsJSON.links.github}`),
    axios.get(`${GITHUB.HOST}/${statsJSON.links.githubMinted}`),
  ])
  .then(axios.spread((response1, response2) => {
    const data1 = extractData(response1.data);
    const data2 = extractData(response2.data);
    const combinedData = combineData(data1, data2);

    const newJSON = {
      ...statsJSON,
      gitContrib: combinedData,
    };
    fs.writeJSONSync(path.join(PATH.CONFIG, 'main/stats.json'), newJSON, JSON_FORMAT);
    return combinedData;
  }))
  .then((data) => {
    const oldTotal = parseInt(cronJSON.gitContrib.total, 10) || 0;
    const newTotal = data.countArray.reduce((x, y) => (x + y), 0);
    const diffNumber = newTotal - oldTotal;
    const diffString = `(${(diffNumber > 0) ? '+' : ''}${diffNumber})`;

    const newJSON = {
      ...cronJSON,
      gitContrib: {
        total: `${newTotal} ${diffString}`,
        lastWeek: data.countArray.slice(data.countArray.length - 7),
      },
    };
    fs.writeJSONSync(path.join(PATH.CONFIG, 'cron.json'), newJSON, JSON_FORMAT);

    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: GitHub contribution records updated.`);
  })
  .catch((err) => { throw err; });
} catch (err) {
  console.error(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to update GitHub contribution records.`);
  process.exit(1);
}
