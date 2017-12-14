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
import { logger } from '../util.js';

import statsJSON from '../../config/main/stats.json';
import cronJSON from '../../config/cron.json';

const log = logger('cron:contrib');


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

const combineData = (...data) => {
  if (new Set(data.map(d => d.startDate)).size > 1) {
    log.error('Date mismatch on GitHub contribution data.');
    throw new Error('Date mismatch on GitHub contribution data.');
  } else if (new Set(data.map(d => d.countArray.length)).size > 1) {
    log.error('countArray length mismatch on GitHub contribution data.');
    throw new Error('countArray length mismatch on GitHub contribution data.');
  }

  const combinedData = {
    startDate: data[0].startDate,
    countArray: data[0].countArray.map((count, i) => (
      data.map(d => d.countArray[i])
      .reduce((sum, d) => (sum + d), 0)
    )),
    indexArray: [],
    maxCount: 0,
    monthText: data[0].monthText,
  };

  const maxCount = Math.max(...combinedData.countArray);
  combinedData.indexArray = combinedData.countArray.map(count => (
    (count === 0) ? 0 : Math.min(Math.floor(count / maxCount * 5 + 1), 4)
  ));
  combinedData.maxCount = maxCount;

  return combinedData;
};

const getContrib = async (account) => {
  try {
    const result = await axios.get(`${GITHUB.HOST}${account}`);
    log.info(`GitHub records retreived for account ${colors.blue(account)}.`);
    return result;
  } catch (err) {
    console.error(err);
    log.error(`Failed to retrieve GitHub records for account ${colors.blue(account)}.`);
    throw err;
  }
};


(async () => {
  try {
    const data = await Promise.all(
      statsJSON.accounts.map(account => getContrib(account))
    );
    const result = data.map(ajax => extractData(ajax.data));
    const combinedData = combineData(...result);

    const newStatsJSON = {
      ...statsJSON,
      gitContrib: combinedData,
    };
    await fs.writeJSON(path.join(PATH.CONFIG, 'main/stats.json'), newStatsJSON, JSON_FORMAT);

    const oldTotal = parseInt(cronJSON.gitContrib.total, 10) || 0;
    const newTotal = combinedData.countArray.reduce((sum, d) => (sum + d), 0);
    const diffNumber = newTotal - oldTotal;
    const diffString = `(${(diffNumber > 0) ? '+' : ''}${diffNumber})`;

    const newCronJSON = {
      ...cronJSON,
      gitContrib: {
        total: `${newTotal} ${diffString}`,
        lastWeek: combinedData.countArray.slice(combinedData.countArray.length - 7),
      },
    };
    await fs.writeJSON(path.join(PATH.CONFIG, 'cron.json'), newCronJSON, JSON_FORMAT);

    log.success('GitHub contribution records updated.');
  } catch (err) {
    console.error(err);
    log.error('Failed to update GitHub contribution records.');
    process.exit(1);
  }
})();
