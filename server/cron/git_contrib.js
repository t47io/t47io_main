import axios from 'axios';
import cheerio from 'cheerio';
import colors from 'colors';
import { promises as fs } from 'fs';
import path from 'path';

import { PATH } from '../env.js';
import { GITHUB } from '../config.js';
import {
  readJsonFile,
  writeJsonFile,
} from '../util.js';
import logger from '../logger.js';

import statsJSON from '../../config/main/stats.json';

const log = logger('cron:contrib');


const extractData = (body) => {
  const $html = cheerio.load(body).html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  return {
    startDate: $('rect').first().attr('data-date'),
    contribs: Object.fromEntries(
      $('rect').map((i, rect) => ([
        [$(rect).attr('data-date'), parseInt($(rect).attr('data-count'), 10)],
      ]))
      .get()
    ),
    monthText: Object.fromEntries(
      $('text').map((i, month) => ([
        [$(month).text(), parseInt($(month).attr('x'), 10)],
      ]))
      .get()
      .filter(entry => !Number.isNaN(entry[1]))
    ),
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
      result = await fs.readFile(path.join(PATH.CONFIG, `repository/account/${account.slice(1)}.svg`), 'utf8');
      result = { data: result };
    } else {
      const getConfig = {
        headers: { Accept: 'text/html' },
      };
      result = await axios.get(`${GITHUB.HOST}users/${account}/contributions`, getConfig);
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
      statsJSON.accounts.map(getContrib)
    );
    const result = data.map(ajax => extractData(ajax.data));
    const combinedData = combineData(...result);

    const newStatsJSON = {
      ...statsJSON,
      gitContrib: combinedData,
    };
    await writeJsonFile('main/stats.json', newStatsJSON);

    const cronJSON = await readJsonFile('cron.json');
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
    await writeJsonFile('cron.json', newCronJSON);

    log.info('GitHub contribution records updated.');
  } catch (err) {
    console.error(err);
    log.error('Failed to update GitHub contribution records.');
    process.exit(1);
  }
})();
