import {
  svgReactRegex,
  getContextObject,
} from '../../common/util.js';

export SvgCopyRight from '../images/fa-cr.svg';
export SvgCreativeCommon from '../images/fa-cc.svg';


const ERROR_CODES = require.context('../images/digits/', false, /\.svg$/);
export const imgErrors = getContextObject(ERROR_CODES, svgReactRegex);
