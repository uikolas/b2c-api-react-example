import { IReduxState } from 'src/typings/app';
import {IWishlist, IWishlistProduct, TWishListId} from "src/shared/interfaces/wishlist/index";
import {IActionData} from "src/shared/reducers/types";
import {TProductSKU} from "src/shared/interfaces/product/index";


export interface WishlistState extends IReduxState {
  data: {
    wishlists: IWishlist[],
    currentWishlist: IWishlist | null,
    currentItems: Array<IWishlistProduct>,
    isInitial: boolean,
  };
}

export interface IPageWishlistAction extends IActionData {
  payloadWishlistDataFulfilled?: {
    data?: IWishlist;
    wishlistId?: TWishListId;
    products?: Array<IWishlistProduct>;
    wishlists?: IWishlist[]
  };
  payloadWishlistProductFulfilled?: {
    wishlistId: TWishListId;
    sku: TProductSKU
  };
}
