import SvgAvatar from '../images/t47_avatar.svg';
import SvgName from '../images/t47_name.svg';


const svgUrlRegex = /\.\/(.*)-.*$/g;
const svgReactRegex = /\.\/(.*)\.svg/g;
const getContextObject = (context, regex = svgUrlRegex) => (
  context.keys().map(key => ({
    [key.replace(regex, '$1')]: context(key),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {})
);

const AFFILIATION_THUMBS_1 = require.context('../images/affiliations/', false, /-1\.svg$/);
const AFFILIATION_THUMBS_2 = require.context('../images/affiliations/', false, /-2\.svg$/);
const AFFILIATION_THUMBS_3 = require.context('../images/affiliations/', false, /-3\.svg$/);
export const imgAffiliations = [
  getContextObject(AFFILIATION_THUMBS_1),
  getContextObject(AFFILIATION_THUMBS_2),
  getContextObject(AFFILIATION_THUMBS_3),
];

const PORTFOLIO_THUMBS_0 = require.context('../images/portfolio/', false, /-0\.svg$/);
const PORTFOLIO_THUMBS_1 = require.context('../images/portfolio/', false, /-1\.svg$/);
const PORTFOLIO_THUMBS_2 = require.context('../images/portfolio/', false, /-2\.svg$/);
export const imgPortfolio = [
  getContextObject(PORTFOLIO_THUMBS_0),
  getContextObject(PORTFOLIO_THUMBS_1),
  getContextObject(PORTFOLIO_THUMBS_2),
];

const BACKGROUNDS = require.context('../images/backgrounds/', false, /\.svg$/);
export const imgBackgrounds = getContextObject(BACKGROUNDS);

const PUBLICATION_THUMBS_0 = require.context('../images/publications/', false, /-0\.svg$/);
const PUBLICATION_THUMBS_1 = require.context('../images/publications/', false, /-1\.svg$/);
const PUBLICATION_THUMBS_2 = require.context('../images/publications/', false, /-2\.svg$/);
export const imgPublications = [
  getContextObject(PUBLICATION_THUMBS_0),
  getContextObject(PUBLICATION_THUMBS_1),
  getContextObject(PUBLICATION_THUMBS_2),
];


const BRAND_LOGOS = require.context('../images/brands/', false, /\.svg$/);
export const imgBrands = getContextObject(BRAND_LOGOS, svgReactRegex);

export const imgThesis = [
  require('../images/t47_thesis-0.svg'),
  require('../images/t47_thesis-1.svg'),
  require('../images/t47_thesis-2.svg'),
];

export {
  SvgAvatar,
  SvgName,
};
