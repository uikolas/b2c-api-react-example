import { isPageHomeStateLoading, pagesHome } from './Pages/Home';
import { isPageLoginStateLoading, pagesLogin } from './Pages/Login';
import { isPageSearchStateLoading, pageSearch } from './Pages/Search';
import { isPageProductStateLoading, pageProduct } from './Pages/Product';
import { isPageWishlistStateLoading, pageWishlist } from './Pages/Wishlist';
import { cart, isCartLoading } from './Common/Cart';
import { init, isAppLoading } from './Common/Init';
import { isOrderHistoryLoading, orderHistory } from './Pages/OrderHistory';
import { isOrderDetailsLoading, orderDetails } from './Pages/OrderDetails';

export const reducers = {
  pagesHome,
  pagesLogin,
  pageSearch,
  pageProduct,
  pageWishlist,
  cart,
  init,
  orderHistory,
  orderDetails,
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
    || isOrderHistoryLoading(state, props)
    || isOrderDetailsLoading(state, props),
  );
}
