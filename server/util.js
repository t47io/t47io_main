
import { HTTP_CODE } from './config.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';

const { contact } = require('../config/main.json');

export const resumeVersion = contact.resume;

export const projectPathRegex = new RegExp(`^/project/(${PROJECT_LIST.join('|')})/?$`);
export const errorPathRegex = new RegExp(`^/error/(${HTTP_CODE.join('|')})/?$`);

export const sendErrorResponse = (code) => {
  const err = new Error();
  err.status = code;
  return err;
};
