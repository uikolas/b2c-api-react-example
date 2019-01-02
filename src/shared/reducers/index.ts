import { isPageHomeStateLoading, pagesHome } from './Pages/Home';
import { isPageLoginStateLoading, pagesLogin } from './Pages/Login';
import { isPageSearchStateLoading, pageSearch } from './Pages/Search';
import { isPageProductStateLoading, pageProduct } from './Pages/Product';
import { isPageWishlistStateLoading, pageWishlist } from './Pages/Wishlist';
import { isPageAddressesStateLoading, pageAddresses } from './Pages/Addresses/index';
import { isPageCustomerProfileLoading, pageCustomerProfile } from './Pages/CustomerProfile';
import { isPageCheckoutStateLoading, pageCheckout } from './Pages/Checkout';
import { cart } from './Common/Cart';
import { init, isAppLoading } from './Common/Init/index';
import { isOrderHistoryLoading, orderHistory } from './Pages/OrderHistory';
import { isOrderDetailsLoading, orderDetails } from './Pages/OrderDetails';
import {isCartStateLoading} from "src/shared/reducers/Common/Cart/selectors";
import {IReduxStore, IReduxOwnProps} from "src/shared/reducers/types";


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

export function isStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
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
