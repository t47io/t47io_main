import { THEMES } from '../config.js';
import { loadFileSync } from './util.js';


const theme = THEMES[new Date().getMonth() % 3];
const colorCSS = loadFileSync(`applications/common/themes/${theme}.scss`);


export default colorCSS;
