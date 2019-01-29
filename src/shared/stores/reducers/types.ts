import {ILoginState} from "src/shared/stores/reducers/pages/login/types";
import {ISearchState} from "src/shared/stores/reducers/pages/search/types";
import {IProductState} from "src/shared/stores/reducers/pages/product/types";
import {WishlistState} from "src/shared/stores/reducers/pages/wishlist/types";
import {IAddressesState} from "src/shared/stores/reducers/pages/addresses/types";
import {ICheckoutState} from "src/shared/stores/reducers/pages/checkout/types";
import {ICartState} from "@stores/reducers/common/Cart/types";
import {IOrderHistoryState} from "src/shared/stores/reducers/pages/orderHistory/types";
import {IOrderDetailsState} from "src/shared/stores/reducers/pages/orderDetails/types";
import {ICustomerDataState} from "@stores/reducers/Pages/CustomerProfile/types";
import {RouteProps} from "react-router";
import {WithRouter} from "src/shared/interfaces/common/react";
import {IInitState} from "src/shared/stores/reducers/common/init/types";
import {IApiErrorResponse} from "src/shared/services/types";

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

export interface IReduxOwnProps extends RouteProps, WithRouter  {
  classes?: {[key: string]: string};
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
