export const imgName = require('../images/t47_name.png');

import imgAvatar from '../images/t47_avatar.svg';
import imgThesis from '../images/t47_thesis.svg';


const pathRegex = /[./]/g;

const getContextObject = (context, ext) => (
  context.keys().map(key => ({
    [key.replace(ext, '').replace(pathRegex, '')]: context(key).default,
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }))
);

const AFFILIATION_THUMBS = require.context('../images/affiliations/', false, /\.svg$/);
const PORTFOLIO_THUMBS = require.context('../images/portfolio/', false, /\.svg$/);
const BRAND_LOGOS = require.context('../images/brands/', false, /\.svg$/);
const PUBLICATION_THUMBS = require.context('../images/publications/', false, /\.svg$/);
const BACKGROUNDS = require.context('../images/backgrounds/', false, /\.svg$/);


export {
  imgAvatar,
  imgThesis,
};
export const imgAffiliations = getContextObject(AFFILIATION_THUMBS, 'svg');
export const imgPortfolio = getContextObject(PORTFOLIO_THUMBS, 'svg');
export const imgBrands = getContextObject(BRAND_LOGOS, 'svg');
export const imgPublications = getContextObject(PUBLICATION_THUMBS, 'svg');
export const imgBackgrounds = getContextObject(BACKGROUNDS, 'svg');
