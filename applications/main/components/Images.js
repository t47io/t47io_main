export const imgAvatar = require('../images/t47_avatar.jpg');
export const imgName = require('../images/t47_name.png');
// export const imgPhone = require('../images/t47_phone.png');

const pathRegex = /[./]/g;

const getContextObject = (context, ext) => (
  context.keys().map(key => ({
    [key.replace(ext, '').replace(pathRegex, '')]: context(key),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }))
);

const BRAND_LOGOS = require.context('../../vendor/js-logo/', false, /\.svg$/);
const PUB_THUMBS = require.context('../images/publications/', false, /\.svg$/);

export const brandLogos = getContextObject(BRAND_LOGOS, 'svg');
export const pubThumbs = getContextObject(PUB_THUMBS, 'svg');
