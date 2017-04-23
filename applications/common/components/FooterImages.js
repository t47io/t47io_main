const img1xSFO = require('../images/fg_city_sfo@1.5x.gif');
const img2xSFO = require('../images/fg_city_sfo@2x.gif');
const img3xSFO = require('../images/fg_city_sfo@3x.gif');

const img1xSEA = require('../images/fg_city_sea@1.5x.gif');
const img2xSEA = require('../images/fg_city_sea@2x.gif');
const img3xSEA = require('../images/fg_city_sea@3x.gif');


export const imgSFO = require('../images/fg_city_sfo.gif');
export const imgSEA = require('../images/fg_city_sea.gif');

export const imgSrcSetSFO = `
  ${imgSFO} 1x,
  ${img1xSFO} 1.5x,
  ${img2xSFO} 2x,
  ${img3xSFO} 3x
`;

export const imgSrcSetSEA = `
  ${imgSEA} 1x,
  ${img1xSEA} 1.5x,
  ${img2xSEA} 2x,
  ${img3xSEA} 3x
`;
