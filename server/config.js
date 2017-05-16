import emailer from 'nodemailer';

const env = require('../config/server.json');


export const DEBUG = env.DEBUG;
export const PORT = env.port;

export const EMAIL_RECV = env.email.login;
export const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);

export const HTTP_CODE = [400, 401, 403, 404, 405, 500, 502, 503];

export const HTML_HEADER = (DEBUG = false) => ({
  'Content-Type': 'text/html; charset=UTF-8',
  ...(DEBUG ? {} : { 'Content-Encoding': 'gzip' }),
  'X-UA-Compatible': 'IE=edge',
});
