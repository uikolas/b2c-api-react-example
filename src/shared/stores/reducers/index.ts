import { isPageLoginStateLoading, pagesLogin } from './pages/login/index';
import { isPageSearchStateLoading, pageSearch } from './pages/search/index';
import { isPageProductStateLoading, pageProduct } from './pages/product/index';
import { isPageWishlistStateLoading, pageWishlist } from './pages/wishlist/index';
import { isPageAddressesStateLoading, pageAddresses } from './pages/addresses/index';
import { isPageCustomerProfileLoading, pageCustomerProfile } from './pages/customerProfile';
import { isPageCheckoutStateLoading, pageCheckout } from './pages/checkout/index';
import { cart } from './common/cart';
import { init, isAppLoading } from './common/init/index';
import { isOrderHistoryLoading, orderHistory } from './pages/orderHistory/index';
import { isOrderDetailsLoading, orderDetails } from './pages/orderDetails/index';
import {isCartStateLoading} from "@stores/reducers/common/Cart/selectors";
import {IReduxStore, IReduxOwnProps} from "@stores/reducers/types";


export const reducers = {
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

export function isStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(
    isPageProductStateLoading(state, props)
    || isPageLoginStateLoading(state, props)
    || isCartStateLoading(state, props)
    || isPageSearchStateLoading(state, props)
    || isAppLoading(state, props)
    || isPageWishlistStateLoading(state, props)
    || isOrderHistoryLoading(state, props)
    || isOrderDetailsLoading(state, props)
    || isPageCustomerProfileLoading(state, props)
    || isPageAddressesStateLoading(state, props)
    || isPageCheckoutStateLoading(state, props)
  );
}
