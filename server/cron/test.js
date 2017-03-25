import axios from 'axios';
import cheerio from 'cheerio';
import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';

const json = {
  links: {
    github: 'https://github.com/t47io/',
    githubMinted: 'https://github.com/SiqiTian-minted/',
  },
};

const extractData = (body) => {
  let $html = cheerio.load(body);
  $html = $html.html('.js-calendar-graph-svg');
  const $ = cheerio.load($html);

  return {
    startDate: $('rect').first().attr('data-date'),
    countArray: $('rect').map((i, rect) => (
      parseInt($(rect).attr('data-count'), 10)
    )).get(),
    monthText: $('text.month').map((i, month) => ({
      [$(month).text()]: parseInt($(month).attr('x'), 10),
    })).get().reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {}),
  };
};

const combineData = (data1, data2) => {
  if (data1.startDate !== data2.startDate) {
    console.log(`${colors.red('ERROR')}: Failed to update GitHub contribution records.`);
    throw new Error('Date mismatch on GitHub contribution data.');
  } else if (data1.countArray.length !== data2.countArray.length) {
    console.log(`${colors.red('ERROR')}: Failed to update GitHub contribution records.`);
    throw new Error('countArray length mismatch on GitHub contribution data.');
  }

  const combinedData = {
    startDate: data1.startDate,
    countArray: [],
    indexArray: [],
    maxCount: 0,
    monthText: data1.monthText,
  };

  combinedData.countArray = data1.countArray.map((count, i) => (
    count + data2.countArray[i]
  ));
  const maxCount = Math.max(...combinedData.countArray);
  combinedData.indexArray = combinedData.countArray.map(count => (
    (count === 0) ? 0 : Math.min(Math.floor(count / maxCount * 5 + 1), 4)
  ));
  combinedData.maxCount = maxCount;

  return combinedData;
};


try {
  axios.all([
    axios.get(json.links.github),
    axios.get(json.links.githubMinted),
  ])
  .then(axios.spread((response1, response2) => {
    const data1 = extractData(response1.data);
    const data2 = extractData(response2.data);
    const combinedData = combineData(data1, data2);

    fs.writeJsonSync(path.join(__dirname, '../../config/test.json'), combinedData);
    console.log(`${colors.green('SUCCESS')}: GitHub contribution records updated.`);
  }))
  .catch((error) => {
    console.log(error);
    console.log(`${colors.red('ERROR')}: Failed to retrieve GitHub contribution records.`);
  });
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to update GitHub contribution records.`);
}
