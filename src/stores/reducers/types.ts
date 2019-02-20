import { ILoginState } from 'src/stores/reducers/pages/login/types';
import { ISearchState } from 'src/stores/reducers/pages/search/types';
import { IProductState } from 'src/stores/reducers/pages/product/types';
import { WishlistState } from 'src/stores/reducers/pages/wishlist/types';
import { IAddressesState } from 'src/stores/reducers/pages/addresses/types';
import { ICheckoutState } from 'src/stores/reducers/pages/checkout/types';
import { ICartState } from 'src/stores/reducers/common/cart/types';
import { IOrderHistoryState } from 'src/stores/reducers/pages/orderHistory/types';
import { IOrderDetailsState } from 'src/stores/reducers/pages/orderDetails/types';
import { ICustomerDataState } from 'src/stores/reducers/pages/customerProfile/types';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { IInitState } from 'src/stores/reducers/common/init/types';
import { IApiErrorResponse } from 'src/services/types';

export interface IReduxState {
    dispatch?: Function;
    error?: string | null;
    pending?: boolean;
    fulfilled?: boolean;
    rejected?: boolean;
    initiated?: boolean;
}

export interface IReduxStore {
    pagesLogin: ILoginState;
    pageSearch: ISearchState;
    pageProduct: IProductState;
    pageWishlist: WishlistState;
    pageAddresses: IAddressesState;
    pageCheckout: ICheckoutState;
    cart: ICartState;
    init: IInitState;
    orderHistory: IOrderHistoryState;
    orderDetails: IOrderDetailsState;
    pageCustomerProfile: ICustomerDataState;
}

export interface IReduxOwnProps extends RouteProps, WithRouter {
    classes?: { [key: string]: string };
    match?: {
        path: string;
        url: string;
        params: { [key: string]: string; };
        isExact: boolean;
    };
}

// Common interface for actions
export interface IActionData {
    type: string;
    payloadRejected?: IApiErrorResponse;
    error?: string;
}
