import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

const indexJSON = {
  home: require('../config/main/home.json'),
  about: require('../config/main/about.json'),
  affiliation: require('../config/main/affiliation.json'),
  portfolio: require('../config/main/portfolio.json'),
  skills: require('../config/main/skills.json'),
  stats: require('../config/main/stats.json'),
  pubs: require('../config/main/pubs.json'),
  contact: require('../config/main/contact.json'),
};
const projectJSON = {
  celica: require('../config/project/celica.json'),
};

const publicPath = path.join(__dirname, '../public');
const getResume = () => {
  const resumeFiles = glob.sync(path.join(publicPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1] || '');
};


const concatIndexJSON = () => {
  const config = {
    ...indexJSON,
    navbar: { items: indexJSON.home.sections.map(section => section.toUpperCase()) },
    home: { title: indexJSON.home.title },
    portfolio: {
      ...indexJSON.portfolio,
      selectedCategory: 'all',
    },
    stats: {
      ...indexJSON.stats,
      items: [
        ...(indexJSON.stats.items.slice(0, 2)),
        {
          ...(indexJSON.stats.items[2]),
          value: indexJSON,
        },
        ...(indexJSON.stats.items.slice(3)),
      ],
    },
    contact: {
      ...indexJSON.contact,
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

  fs.writeJsonSync(path.join(__dirname, '../config/main.json'), config);
};

const concatProjectJSON = () => {
  const config = {
    ...projectJSON,
  };

  fs.writeJsonSync(path.join(__dirname, '../config/project.json'), config);
};


try {
  concatIndexJSON();
  concatProjectJSON();
  console.log(`${colors.green('SUCCESS')}: Main and project JSON compiled.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to compile main and project JSON.`);
}

