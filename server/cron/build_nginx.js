import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import logger from '../logger.js';

const log = logger('update:nginx');


const buildNgxBrotli = () => {
  shell.cd('~');
  shell.rm('-rf', 'ngx_brotli');
  shell.exec('git clone https://github.com/google/ngx_brotli.git');
  shell.cd('ngx_brotli');
  shell.exec('git submodule update --init');
};

const buildNginx = () => {
  shell.cd('~');
  shell.rm('-rf', 'nginx');
  shell.exec('apt-get remove nginx');
  shell.exec('apt-get build-dep nginx');

  const nginxPath = glob.sync(path.join('~/nginx'));
  shell.cd(`nginx/${nginxPath[0]}`);

  shell.exec('./configure --add-module=~/ngx_brotli --sbin-path=/usr/sbin/nginx');
  shell.exec('make');
  shell.exec('make install');
  shell.exec('service nginx restart');
};


try {
  buildNgxBrotli();
  buildNginx();
  log.info('Nginx with Brotli module rebuilt.');
} catch (err) {
  console.error(err);
  log.error('Failed to rebuild Nginx with Brotli module.');
  process.exit(1);
}
