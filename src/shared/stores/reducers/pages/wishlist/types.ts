import { IReduxState } from 'src/typings/app';
import { IWishlist, IWishlistProduct, TWishListId } from 'src/shared/interfaces/wishlist/index';
import { IActionData } from 'src/shared/stores/reducers/types';
import { TProductSKU } from 'src/shared/interfaces/product';

export interface WishlistState extends IReduxState {
    data: {
        wishlists: IWishlist[],
        currentWishlist: IWishlist | null,
        currentItems: IWishlistProduct[],
        isInitial: boolean,
    };
}

export interface IPageWishlistAction extends IActionData {
    payloadWishlistDataFulfilled?: {
        data?: IWishlist;
        wishlistId?: TWishListId;
        products?: IWishlistProduct[];
        wishlists?: IWishlist[]
    };
    payloadWishlistProductFulfilled?: {
        wishlistId: TWishListId;
        sku: TProductSKU
    };
}
