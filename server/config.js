import emailer from 'nodemailer';

const env = require('../config/server.json');


export const DEBUG = env.DEBUG;
export const PORT = env.port;

export const EMAIL_RECV = env.email.login;
export const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);

export const HTTP_CODE = [400, 401, 403, 404, 405, 500, 502, 503];

const HTML_HEADER = {
  'Content-Type': 'text/html; charset=UTF-8',
  'X-UA-Compatible': 'IE=edge',
};
if (!DEBUG) {
  HTML_HEADER['Content-Encoding'] = 'gzip';
}
export { HTML_HEADER };
