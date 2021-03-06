import {
  PATH,
  CHMOD,
} from '../env.js';
import { exec } from '../util.js';
import logger from '../logger.js';

const log = logger('cron:chmod');


const excludeFind = () => (
  CHMOD.EXCLUDES.map(dir => `-not -path "./${dir}/*"`).join(' ')
);

const chmodRoot = async () => {
  await exec(`chown -R ${CHMOD.USER}:${CHMOD.USER} ${PATH.ROOT}`);
  await Promise.all([
    exec(`find . ${excludeFind()} -type f | xargs chmod 640`),
    exec(`find . ${excludeFind()} -type d | xargs chmod 750`),
  ]);
};

const chmodPublic = async () => {
  const userGroup = `${CHMOD.USER}:${CHMOD.GROUP}`;
  await exec(`chown -R ${userGroup} ${PATH.PUBLIC}`);
  await exec(`chown ${userGroup} ${PATH.ROOT} ${PATH.ROOT}/..`);
};


(async () => {
  try {
    await chmodRoot();
    await chmodPublic();
    log.info('Permission changed for directories and files.');
  } catch (err) {
    console.error(err);
    log.error('Failed to change permission for directories and files.');
    process.exit(1);
  }
})();
