import shell from 'shelljs';

import {
  ROOT,
  PATH,
  CHMOD,
} from '../env.js';
import logger from '../logger.js';

const log = logger('cron:chmod');


const excludeFind = () => (
  CHMOD.EXCLUDES.map(dir => `-not -path "./${dir}/*"`).join(' ')
);

const chmodRoot = () => {
  shell.cd(ROOT);
  shell.exec(`chown -R ${CHMOD.USER}:${CHMOD.USER} * .*`);
  shell.exec(`find . ${excludeFind()} -type f | xargs chmod 640`);
  shell.exec(`find . ${excludeFind()} -type d | xargs chmod 750`);
};

const chmodPublic = () => {
  shell.cd(PATH.PUBLIC);
  shell.exec(`chown -R ${CHMOD.USER}:${CHMOD.GROUP} *`);
  shell.exec(`chown ${CHMOD.USER}:${CHMOD.GROUP} . .. ../..`);
};


try {
  chmodRoot();
  chmodPublic();

  log.info('Permission changed for directories and files.');
} catch (err) {
  console.error(err);
  log.error('Failed to change permission for directories and files.');
  process.exit(1);
}
