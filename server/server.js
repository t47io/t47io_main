import colors from 'colors';
import express from 'express';
import path from 'path';

import {
  PATH,
  MAINTENANCE,
  PORT,
} from './env.js';
import {
  HTTP_CODES,
  CACHE_MAX_AGE,
} from './config.js';
import middlewares from './middleware.js';
import routes from './route.js';
import {
  pubsPathRegex,
  thesisPathRegex,
  projectPathRegex,
  errorPathRegex,
  getZipExt,
  getHeader,
  sendErrorResponse,
} from './util.js';


const app = express();
app.disable('x-powered-by');
app.listen(PORT, () => console.log(`${colors.rainbow('t47io Main Site')} listening on port: ${colors.red(PORT)} ...`));

middlewares.forEach((middleware) => {
  if (Array.isArray(middleware)) {
    app.use(...middleware);
  } else {
    app.use(middleware);
  }
});
if (MAINTENANCE) {
  app.all('*', (req, res, next) => next(sendErrorResponse(503)));
}

app.get('/', routes.main);
app.get(projectPathRegex, routes.project);

app.get('/resume', routes.resume);
app.get(pubsPathRegex, routes.pubs);
app.get(thesisPathRegex, routes.thesis);
app.route('/send').get(routes.email.get).post(routes.email.post);

app.get(errorPathRegex, routes.error);
app.all('*', routes.all);

app.use((err, req, res, next) => {
  let code = 500;
  if (err.status) {
    code = HTTP_CODES.includes(err.status) ? err.status : 503;
  } else {
    console.error(err);
  }

  const ext = getZipExt(req.headers, 2);
  return res.status(code).sendFile(path.join(PATH.PUBLIC, `e.${code}.html.${ext}`), {
    headers: getHeader(req, true),
    maxAge: `${CACHE_MAX_AGE} days`,
  });
});

// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });
