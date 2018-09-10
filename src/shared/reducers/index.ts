import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {pagesHome} from './Pages/Home';


// export const reducers = combineReducers({
//   routing,
//   pagesHome,
// });

export const reducers = {
  pagesHome,
};
