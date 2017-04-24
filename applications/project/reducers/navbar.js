import {
  HOME,
  PORTFOLIO,
} from '../../main/constants/sectionTypes.js';
import { PROJECT_LIST } from '../constants/projectTypes.js';


const initialState = {
  data: {
    items: [
      HOME,
      PORTFOLIO,
    ],
    dropdown: PROJECT_LIST,
  },
  animations: {
    activeSection: PORTFOLIO,
    isMobileCollapsed: false,
  },
};

const navbarReducer = (state = initialState) => (state);


export default navbarReducer;
