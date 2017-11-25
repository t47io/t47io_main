import SvgCopyRight from '../images/copyright.svg';
import SvgCC from '../images/creative-commons.svg';


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

const ERROR_CODES = require.context('../images/', false, /\.png$/);


export {
  SvgCopyRight,
  SvgCC,
};
export const imgErrors = getContextObject(ERROR_CODES, 'png');
