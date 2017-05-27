import emailer from 'nodemailer';

const { debug, port, email } = require('../config/server.json');


export const DEBUG = debug;
export const PORT = port;

export const EMAIL_RECV = email.login;
export const SMTP = emailer.createTransport(`${email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${email.password}@${email.host}:${email.port}`);

export const HTTP_CODE = [400, 401, 403, 404, 405, 500, 502, 503];

export const HTML_HEADER = (DEBUG = false) => ({
  'Content-Type': 'text/html; charset=UTF-8',
  ...(DEBUG ? {} : { 'Content-Encoding': 'gzip' }),
  'X-UA-Compatible': 'IE=edge',
});

export const GITHUB_RETRY = 5;
export const GITHUB_INTERVAL = 1000;
