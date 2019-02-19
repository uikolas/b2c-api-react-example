import { IWishlist, IWishlistProduct, TWishlistId } from 'src/shared/interfaces/wishlist/index';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { TProductSKU } from 'src/shared/interfaces/product';

export interface WishlistState extends IReduxState {
    data: {
        wishlists: IWishlist[],
        currentWishlist: IWishlist | null,
        currentItems: IWishlistProduct[],
        isInitialList: boolean,
        isInitialDetail: boolean,
    };
}

export interface IPageWishlistAction extends IActionData {
    payloadWishlistDataFulfilled?: {
        data?: IWishlist;
        wishlistId?: TWishlistId;
        products?: IWishlistProduct[];
        wishlists?: IWishlist[]
    };
    payloadWishlistProductFulfilled?: {
        wishlistId: TWishlistId;
        sku: TProductSKU
    };
}
