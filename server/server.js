import express from 'express';
import path from 'path';

import {
  PUBLIC_PATH,
  MAINTENANCE,
  HTTP_CODE,
  HTML_HEADER,
  CACHE_MAX_AGE,
} from './config.js';
import { app } from './middleware.js';
import routes from './route.js';
import {
  projectPathRegex,
  errorPathRegex,
  sendErrorResponse,
} from './util.js';


if (MAINTENANCE) {
  app.all('*', (req, res, next) => next(sendErrorResponse(503)));
}

app.get('/', routes.main);
app.get(projectPathRegex, routes.project);

app.use(express.static(PUBLIC_PATH, { maxAge: `${CACHE_MAX_AGE * 5} days` }));

app.get('/resume', routes.resume);
app.route('/send').get(routes.email.get).post(routes.email.post);

// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });

app.get(errorPathRegex, routes.error);
app.all('*', routes.all);

app.use((err, req, res, next) => {
  let code = 500;
  if (err.status) {
    code = HTTP_CODE.includes(err.status) ? err.status : 503;
  } else {
    console.error(err);
  }

  return res.status(code).sendFile(path.join(PUBLIC_PATH, `e.${err.status}.html.gz`), {
    headers: HTML_HEADER(false),
    maxAge: `${CACHE_MAX_AGE} days`,
  });
});
