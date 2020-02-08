import path from 'path';

import {
  exec,
  glob,
} from '../util.js';
import logger from '../logger.js';

const log = logger('update:nginx');


const buildNgxBrotli = async () => {
  await exec('rm -rf ~/ngx_brotli');
  await exec('cd ~ && git clone https://github.com/google/ngx_brotli.git');
  await exec('cd ~/ngx_brotli && git submodule update --init');
};

const buildNginx = async () => {
  await exec('rm -rf ~/nginx');
  await exec('apt-get remove nginx');
  await exec('apt-get build-dep nginx');

  const nginxPath = await glob(path.join('~/nginx'));
  await exec(`cd nginx/${nginxPath[0]}`);

  await exec('./configure --add-module=~/ngx_brotli --sbin-path=/usr/sbin/nginx');
  await exec('make');
  await exec('make install');
  await exec('service nginx restart');
};


(async () => {
  try {
    await buildNgxBrotli();
    await buildNginx();
    log.info('Nginx with Brotli module rebuilt.');
  } catch (err) {
    console.error(err);
    log.error('Failed to rebuild Nginx with Brotli module.');
    process.exit(1);
  }
})();
