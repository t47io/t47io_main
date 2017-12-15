import {
  renderMainHTML,
  renderProjectHTML,
} from '../render/client.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:client');


try {
  const baseHTML = loadFileSync('public/main.html');
  const finalHTML = renderMainHTML(baseHTML);

  saveFileSync('public/main.html', finalHTML);
  log.info('Main Page DOM/JS/CSS inlined.');
} catch (err) {
  console.error(err);
  log.error('Failed to inline DOM/JS/CSS on Main Page.');
  process.exit(1);
}

try {
  const baseHTML = loadFileSync('public/project.html');
  const finalHTML = renderProjectHTML(baseHTML);

  saveFileSync('public/project.html', finalHTML);
  log.info('Project Page DOM/JS/CSS inlined.');
} catch (err) {
  console.error(err);
  log.error('Failed to inline DOM/JS/CSS on Project Page.');
  process.exit(1);
}
