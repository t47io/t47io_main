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
import logger from '../logger.js';

import statsJSON from '../../config/main/stats.json';

const log = logger('cron:contrib');


const extractData = (body) => {
  const $html = cheerio.load(body).html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  return {
    startDate: $('rect.day').first().attr('data-date'),
    contribs: $('rect.day').map((i, rect) => ({
      [$(rect).attr('data-date')]: parseInt($(rect).attr('data-count'), 10),
    })).get()
    .reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {}),
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
  const countDates = Object.keys(data[0].contribs).sort();
  const combinedCounts = countDates.map(date => (
    data.map(d => d.contribs[date] || 0)
    .reduce((sum, d) => (sum + d), 0)
  ));
  const maxCount = Math.max(...combinedCounts);

  return {
    startDate: data[0].startDate,
    countArray: combinedCounts,
    indexArray: combinedCounts.map(count => (
      (count === 0) ? 0 : Math.min(Math.floor(count / maxCount * 5 + 1), 4)
    )),
    maxCount,
    monthText: data[0].monthText,
  };
};

const getContrib = async (account) => {
  try {
    let result;
    if (account.startsWith('@')) {
      result = await fs.readFile(path.join(PATH.CONFIG, `${account.slice(1)}.svg`), 'utf8');
      result = { data: result };
    } else {
      result = await axios.get(`${GITHUB.HOST}users/${account}/contributions`);
    }
    log.debug(`GitHub records retreived for account ${colors.blue(account)}.`);
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

    const cronJSON = await fs.readJSON(path.join(PATH.CONFIG, 'cron.json'));
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

    log.info('GitHub contribution records updated.');
  } catch (err) {
    console.error(err);
    log.error('Failed to update GitHub contribution records.');
    process.exit(1);
  }
})();
