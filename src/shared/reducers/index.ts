import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {isPageHomeStateLoading, pagesHome} from './Pages/Home';
import {isPageLoginStateLoading, pagesLogin} from './Pages/Login';
import {isPageSearchStateLoading, pageSearch} from './Pages/Search';
import {isPageProductStateLoading, pageProduct} from './Pages/Product';
import {cart, isCartLoading} from './Common/Cart';
import {init, isAppLoading} from './Common/Init';
import {orderHistory, isOrderHistoryLoading} from "./Pages/OrderHistory";


// export const reducers = combineReducers({
//   routing,
//   pagesHome,
// });

export const reducers = {
  pagesHome,
  pagesLogin,
  pageSearch,
  pageProduct,
  cart,
  init,
  orderHistory,
};

export function isStateLoading(state: any, props: any): boolean {
  return Boolean(
    isPageProductStateLoading(state, props)
    || isPageLoginStateLoading(state, props)
    || isCartLoading(state, props)
    || isPageSearchStateLoading(state, props)
    || isPageHomeStateLoading(state, props)
    || isAppLoading(state, props)
    || isOrderHistoryLoading(state, props)
  );
}
