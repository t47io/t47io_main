import colors from 'colors';
import path from 'path';
import shell from 'shelljs';

import {
  PUBLIC_PATH,
  CHMOD_USER,
  CHMOD_GROUP,
} from '../config.js';


const chmodRoot = () => {
  shell.cd(path.join(PUBLIC_PATH, '../'));
  shell.exec(`chown -R ${CHMOD_USER}:${CHMOD_USER} *`);
  shell.exect('find . -type d | xargs chmod 640');
  shell.exect('find . -type f | xargs chmod 750');
};

const chmodPublic = () => {
  shell.cd(PUBLIC_PATH);
  shell.exec(`chown -R ${CHMOD_USER}:${CHMOD_GROUP} *`);
  shell.exec(`chown -R ${CHMOD_USER}:${CHMOD_GROUP} ..`);
};


try {
  chmodRoot();
  chmodPublic();

  console.log(`${colors.green('SUCCESS')}: Permission changed for directories and files.`);
} catch (err) {
  console.error(err);
  console.log(`${colors.red('ERROR')}: Failed to change permission for directories and files.`);
}
