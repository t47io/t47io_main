import {
  svgReactRegex,
  svgAvatarRegex,
  getContextObject,
} from '../../common/util.js';


export imgName from '../images/t47_name.svg';

const AVATARS = require.context('../images/', false, /avatar-[0-5]{1}\.svg$/);
export const imgAvatars = getContextObject(AVATARS, svgAvatarRegex);
export SvgAvatar from '../images/t47_avatar.svg';

export const imgThesis = [
  require('../images/t47_thesis-0.svg'),
  require('../images/t47_thesis-1.svg'),
  require('../images/t47_thesis-2.svg'),
];


const BRAND_LOGOS = require.context('../images/brands/', false, /\.svg$/);
export const imgBrands = getContextObject(BRAND_LOGOS, svgReactRegex);

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

const PUBLICATION_THUMBS_0 = require.context('../images/publications/', false, /-0\.svg$/);
const PUBLICATION_THUMBS_1 = require.context('../images/publications/', false, /-1\.svg$/);
const PUBLICATION_THUMBS_2 = require.context('../images/publications/', false, /-2\.svg$/);
export const imgPublications = [
  getContextObject(PUBLICATION_THUMBS_0),
  getContextObject(PUBLICATION_THUMBS_1),
  getContextObject(PUBLICATION_THUMBS_2),
];

const BACKGROUNDS_0 = require.context('../images/backgrounds/', false, /-0\.svg$/);
const BACKGROUNDS_1 = require.context('../images/backgrounds/', false, /-1\.svg$/);
const BACKGROUNDS_2 = require.context('../images/backgrounds/', false, /-2\.svg$/);
const BACKGROUNDS_3 = require.context('../images/backgrounds/', false, /-3\.svg$/);
export const imgBackgrounds = [
  getContextObject(BACKGROUNDS_0),
  getContextObject(BACKGROUNDS_1),
  getContextObject(BACKGROUNDS_2),
  getContextObject(BACKGROUNDS_3),
];
