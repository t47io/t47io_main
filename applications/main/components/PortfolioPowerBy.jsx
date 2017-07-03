import React from 'react';

const babel = require('../../vendor/js-logo/babel.svg');
const express = require('../../vendor/js-logo/express.svg');
const nginx = require('../../vendor/js-logo/nginx.svg');
const nodejs = require('../../vendor/js-logo/nodejs.svg');
const pm2 = require('../../vendor/js-logo/pm2.svg');
const preact = require('../../vendor/js-logo/preact.svg');
const redux = require('../../vendor/js-logo/redux.svg');
const ubuntu = require('../../vendor/js-logo/ubuntu.svg');
const vultr = require('../../vendor/js-logo/vultr.svg');
const webpack = require('../../vendor/js-logo/webpack.svg');
const yarn = require('../../vendor/js-logo/yarn.svg');


const PortfolioPowerBy = () => (
  <div className="PORTFOLIO__power-by">
    <i dangerouslySetInnerHTML={{ __html: preact }} />
    <i dangerouslySetInnerHTML={{ __html: redux }} />
    <i dangerouslySetInnerHTML={{ __html: webpack }} />
    <i dangerouslySetInnerHTML={{ __html: babel }} />
    <i dangerouslySetInnerHTML={{ __html: yarn }} />
    <i dangerouslySetInnerHTML={{ __html: nodejs }} />
    <i dangerouslySetInnerHTML={{ __html: express }} />
    <i dangerouslySetInnerHTML={{ __html: pm2 }} />
    <i dangerouslySetInnerHTML={{ __html: nginx }} />
    <i dangerouslySetInnerHTML={{ __html: ubuntu }} />
    <i dangerouslySetInnerHTML={{ __html: vultr }} />
  </div>
);

PortfolioPowerBy.propTypes = {};
PortfolioPowerBy.defaultProps = {};


export default PortfolioPowerBy;
