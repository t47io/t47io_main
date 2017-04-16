import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

const mainJson = {
  home: require('../config/main/home.json'),
  about: require('../config/main/about.json'),
  affiliation: require('../config/main/affiliation.json'),
  portfolio: require('../config/main/portfolio.json'),
  skills: require('../config/main/skills.json'),
  stats: require('../config/main/stats.json'),
  pubs: require('../config/main/pubs.json'),
  contact: require('../config/main/contact.json'),
};
const projectJson = {
  daslab: require('../config/project/daslab.json'),
  primerize: require('../config/project/primerize.json'),
  rmdb: require('../config/project/rmdb.json'),
  eterna: require('../config/project/eterna.json'),
  hitrace: require('../config/project/hitrace.json'),
  spindle: require('../config/project/spindle.json'),
  ribokit: require('../config/project/ribokit.json'),
  celica: require('../config/project/celica.json'),
  _subtitles: require('../config/project/_subtitles.json'),
};

const publicPath = path.join(__dirname, '../public');
const getResume = () => {
  const resumeFiles = glob.sync(path.join(publicPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1] || '');
};


const concatMainJSON = () => {
  const config = {
    ...mainJson,
    navbar: { items: mainJson.home.sections.map(section => section.toUpperCase()) },
    home: { title: mainJson.home.title },
    portfolio: {
      ...mainJson.portfolio,
      selectedCategory: 'all',
    },
    contact: {
      ...mainJson.contact,
      resume: getResume(),
    },
  };

  let leftCounter = 0;
  let rightCounter = 0;
  config.skills.items.left = config.skills.items.left.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: leftCounter,
    };
    leftCounter += panel.items.length;
    return panelWithOffset;
  });
  config.skills.items.right = config.skills.items.right.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: rightCounter,
    };
    rightCounter += panel.items.length;
    return panelWithOffset;
  });
  config.skills.lens = {
    left: leftCounter,
    right: rightCounter,
  };

  let pubsCounter = 0;
  config.pubs.items = config.pubs.items.map((year) => {
    const visibleEntries = year.items.filter(item => (!item.isHidden));
    const filteredYear = {
      ...year,
      items: visibleEntries,
      offset: pubsCounter,
    };
    pubsCounter += visibleEntries.length;
    return filteredYear;
  });
  config.pubs.lens = pubsCounter;
  config.stats.items[2].value = pubsCounter;

  fs.writeJsonSync(path.join(__dirname, '../config/main.json'), config);
};

const concatProjectJSON = () => {
  fs.writeJsonSync(path.join(__dirname, '../config/project.json'), projectJson);
};


try {
  concatMainJSON();
  concatProjectJSON();
  console.log(`${colors.green('SUCCESS')}: Main and project JSON compiled.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to compile main and project JSON.`);
}

