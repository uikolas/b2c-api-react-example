import {IHomeState} from "src/shared/reducers/Pages/Home/types";
import {ILoginState} from "src/shared/reducers/Pages/Login/types";
import {ISearchState} from "src/shared/reducers/Pages/Search/types";
import {IProductState} from "src/shared/reducers/Pages/Product/types";
import {WishlistState} from "src/shared/reducers/Pages/Wishlist/types";
import {IAddressesState} from "src/shared/reducers/Pages/Addresses/types";
import {ICheckoutState} from "src/shared/reducers/Pages/Checkout/types";
import {ICartState} from "src/shared/reducers/Common/Cart/types";
import {IOrderHistoryState} from "src/shared/reducers/Pages/OrderHistory/types";
import {IOrderDetailsState} from "src/shared/reducers/Pages/OrderDetails/types";
import {ICustomerDataState} from "src/shared/reducers/Pages/CustomerProfile/types";
import {RouteProps} from "react-router";
import {WithRouter} from "src/shared/interfaces/common/react";
import {IInitState} from "src/shared/reducers/Common/Init/types";
import {IApiErrorResponse} from "src/shared/services/types";

export interface IReduxStore {
  pagesHome: IHomeState;
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
