import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {pagesHome} from './Pages/Home';
import {pagesLogin} from './Pages/Login';
import {pageSearch} from './Pages/Search';


// export const reducers = combineReducers({
//   routing,
//   pagesHome,
// });

export const reducers = {
  pagesHome,
  pagesLogin,
  pageSearch,
};
