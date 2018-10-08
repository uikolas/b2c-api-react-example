import {isPageHomeStateLoading, pagesHome} from './Pages/Home';
import {isPageLoginStateLoading, pagesLogin} from './Pages/Login';
import {isPageSearchStateLoading, pageSearch} from './Pages/Search';
import {isPageProductStateLoading, pageProduct} from './Pages/Product';
import {isPageWishlistStateLoading, pageWishlist} from './Pages/Wishlist';
import {cart, isCartLoading} from './Common/Cart';
import {init, isAppLoading} from './Common/Init';

export const reducers = {
  pagesHome,
  pagesLogin,
  pageSearch,
  pageProduct,
  pageWishlist,
  cart,
  init,
};

export function isStateLoading(state: any, props: any): boolean {
  return Boolean(
    isPageProductStateLoading(state, props)
    || isPageLoginStateLoading(state, props)
    || isCartLoading(state, props)
    || isPageSearchStateLoading(state, props)
    || isPageHomeStateLoading(state, props)
    || isAppLoading(state, props)
    || isPageWishlistStateLoading(state, props)
  );
}
