import {
  svgReactRegex,
  getContextObject,
} from '../../common/util.js';

import SvgCopyRight from '../images/fa-cr.svg';
import SvgCreativeCommon from '../images/fa-cc.svg';

export {
  SvgCopyRight,
  SvgCreativeCommon,
};


const ERROR_CODES = require.context('../images/digits/', false, /\.svg$/);
export const imgErrors = getContextObject(ERROR_CODES, svgReactRegex);
