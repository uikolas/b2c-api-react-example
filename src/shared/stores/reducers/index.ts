import { isPageHomeStateLoading, pagesHome } from './pages/home';
import { isPageLoginStateLoading, pagesLogin } from './pages/login';
import { isPageSearchStateLoading, pageSearch } from './pages/search';
import { isPageProductStateLoading, pageProduct } from './pages/product';
import { isPageWishlistStateLoading, pageWishlist } from './pages/wishlist';
import { isPageAddressesStateLoading, pageAddresses } from './pages/addresses';
import { isPageCustomerProfileLoading, pageCustomerProfile } from './pages/customerProfile';
import { isPageCheckoutStateLoading, pageCheckout } from './pages/checkout';
import { cart } from './common/cart';
import { init, isAppLoading } from './common/init';
import { isOrderHistoryLoading, orderHistory } from './pages/orderHistory';
import { isOrderDetailsLoading, orderDetails } from './pages/orderDetails';
import { isCartStateLoading } from "./common/cart/selectors";


export const reducers = {
  pagesHome,
  pagesLogin,
  pageSearch,
  pageProduct,
  pageWishlist,
  pageAddresses,
  pageCheckout,
  cart,
  init,
  orderHistory,
  orderDetails,
  pageCustomerProfile,
};

export function isStateLoading(state: any, props: any): boolean {
  return Boolean(
    isPageProductStateLoading(state, props)
    || isPageLoginStateLoading(state, props)
    || isCartStateLoading(state, props)
    || isPageSearchStateLoading(state, props)
    || isPageHomeStateLoading(state, props)
    || isAppLoading(state, props)
    || isPageWishlistStateLoading(state, props)
    || isOrderHistoryLoading(state, props)
    || isOrderDetailsLoading(state, props)
    || isPageCustomerProfileLoading(state, props)
    || isPageAddressesStateLoading(state, props)
    || isPageCheckoutStateLoading(state, props)
  );
}
