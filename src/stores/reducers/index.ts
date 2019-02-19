import { isPageLoginStateLoading, pagesLogin } from './pages/login/index';
import { isPageSearchStateLoading, pageSearch } from './pages/search/index';
import { isPageProductStateLoading, pageProduct } from './pages/product/index';
import { pageWishlist } from './pages/wishlist/index';
import { isPageWishlistStateLoading } from './pages/wishlist/selectors';
import { pageAddresses } from './pages/addresses/index';
import { isPageCustomerProfileLoading, pageCustomerProfile } from './pages/customerProfile/index';
import { pageCheckout } from './pages/checkout/index';
import { isPageCheckoutStateLoading } from './pages/checkout/selectors';
import { cart } from './common/cart/index';
import { init, isAppLoading } from './common/init/index';
import { isOrderHistoryLoading, orderHistory } from './pages/orderHistory/index';
import { isOrderDetailsLoading, orderDetails } from './pages/orderDetails/index';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxStore, IReduxOwnProps } from '@stores/reducers/types';
import { isPageAddressesStateLoading } from '@stores/reducers/pages/addresses/selectors';

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
