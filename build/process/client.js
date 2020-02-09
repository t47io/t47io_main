import {
  renderMainHtml,
  renderProjectHtml,
} from '../render/client.js';
import {
  loadFile,
  saveFile,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:client');


const processMainHtml = async () => {
  try {
    log.debug('Processing Main Page inline DOM/JS/CSS...');
    const baseHTML = await loadFile('public/main.html');
    const finalHTML = await renderMainHtml(baseHTML);

    await saveFile('public/main.html', finalHTML);
    log.info('Main Page DOM/JS/CSS inlined.');
  } catch (err) {
    console.error(err);
    log.error('Failed to inline DOM/JS/CSS on Main Page.');
    process.exit(1);
  }
};

const processProjectHtml = async () => {
  try {
    log.debug('Processing Project Page inline DOM/JS/CSS...');
    const baseHTML = await loadFile('public/project.html');
    const finalHTML = await renderProjectHtml(baseHTML);

    await saveFile('public/project.html', finalHTML);
    log.info('Project Page DOM/JS/CSS inlined.');
  } catch (err) {
    console.error(err);
    log.error('Failed to inline DOM/JS/CSS on Project Page.');
    process.exit(1);
  }
};

(async () => {
  await Promise.all([
    processMainHtml(),
    processProjectHtml(),
  ]);
})();
