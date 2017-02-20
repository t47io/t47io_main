import React from 'react';
import fs from 'fs';
import path from 'path';

import ErrorPage from '../error.jsx';

const json = require('../../../config/error.json');

const logo = fs.readFileSync(path.join(__dirname, '../../common/img/t47_logo.svg'), 'utf8');
const images = [400, 401, 403, 404, 405, 500, 502, 503, 201].map((code) => {
  const png = fs.readFileSync(path.join(__dirname, `/../img/${code}.png`)).toString('base64');
  return `data:image/png;base64,${png}`;
});


const BadRequest = () => (
  <ErrorPage logo={logo} code={400} img={images[0]} {...(json[400])} />
);
const Unauthorized = () => (
  <ErrorPage logo={logo} code={401} img={images[1]} {...(json[401])} />
);
const Forbidden = () => (
  <ErrorPage logo={logo} code={403} img={images[2]} {...(json[403])} />
);
const NotFound = () => (
  <ErrorPage logo={logo} code={404} img={images[3]} {...(json[404])} />
);
const MethodNotAllowed = () => (
  <ErrorPage logo={logo} code={405} img={images[4]} {...(json[405])} />
);
const InternalServerError = () => (
  <ErrorPage logo={logo} code={500} img={images[5]} {...(json[500])} />
);
const BadGateway = () => (
  <ErrorPage logo={logo} code={502} img={images[6]} {...(json[502])} />
);
const ServiceUnavailable = () => (
  <ErrorPage logo={logo} code={503} img={images[7]} {...(json[503])} />
);
const Created = () => (
  <ErrorPage logo={logo} code={201} img={images[8]} {...(json[201])} />
);


export default {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  InternalServerError,
  BadGateway,
  ServiceUnavailable,
  Created,
};
