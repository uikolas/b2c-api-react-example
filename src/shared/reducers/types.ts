import {IHomeState} from "src/shared/reducers/Pages/Home";
import {ILoginState} from "src/shared/reducers/Pages/Login";
import {SearchState} from "src/shared/reducers/Pages/Search";
import {IProductState} from "src/shared/reducers/Pages/Product";
import {WishlistState} from "src/shared/reducers/Pages/Wishlist";
import {IAddressesState} from "src/shared/reducers/Pages/Addresses";
import {ICheckoutState} from "src/shared/reducers/Pages/Checkout";
import {ICartState} from "src/shared/reducers/Common/Cart/types";
import {IInitState} from "src/shared/reducers/Common/Init";
import {IOrderHistoryState} from "src/shared/reducers/Pages/OrderHistory";
import {IOrderDetailsState} from "src/shared/reducers/Pages/OrderDetails";
import {ICustomerDataState} from "src/shared/reducers/Pages/CustomerProfile/types";

export interface IReduxStore {
  pagesHome: IHomeState;
  pagesLogin: ILoginState;
  pageSearch: SearchState;
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

export interface IReduxOwnProps {

}
