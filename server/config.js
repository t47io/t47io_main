import emailer from 'nodemailer';

const env = require('../config/server.json');

const DEBUG = env.DEBUG;
const PORT = env.port;
const EMAIL_RECV = env.email.login;
const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);

const HTTP_CODE = [400, 401, 403, 404, 405, 500, 502, 503];

export {
  DEBUG,
  PORT,
  EMAIL_RECV,
  SMTP,
  HTTP_CODE,
};
