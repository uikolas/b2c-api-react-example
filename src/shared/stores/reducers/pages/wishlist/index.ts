import produce from 'immer';
import {
    ADD_ITEM_WISHLIST,
    ADD_WISHLIST,
    DELETE_ITEM_WISHLIST,
    DELETE_WISHLIST,
    DETAIL_WISHLIST,
    UPDATE_WISHLIST,
    WISHLIST_ALL_LISTS,
} from '@stores/actionTypes/Pages/Wishlist';
import { IWishlist, IWishlistProduct } from 'src/shared/interfaces/wishlist/index';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { IPageWishlistAction, WishlistState } from 'src/shared/stores/reducers/pages/wishlist/types';

export const initialState: WishlistState = {
    data: {
        wishlists: [],
        currentWishlist: null,
        currentItems: [],
        isInitial: false,
    },
};

export const pageWishlist = produce<WishlistState>(
    (draft: WishlistState, action: IPageWishlistAction) => {
        switch (action.type) {
            case `${WISHLIST_ALL_LISTS}_PENDING`:
            case `${ADD_WISHLIST}_PENDING`:
            case `${DELETE_WISHLIST}_PENDING`:
            case `${UPDATE_WISHLIST}_PENDING`:
            case `${DELETE_ITEM_WISHLIST}_PENDING`:
            case `${ADD_ITEM_WISHLIST}_PENDING`:
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${DETAIL_WISHLIST}_PENDING`:
                draft.data.currentWishlist = null;
                draft.data.currentItems = [];
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${WISHLIST_ALL_LISTS}_REJECTED`:
            case `${ADD_WISHLIST}_REJECTED`:
            case `${DELETE_WISHLIST}_REJECTED`:
            case `${UPDATE_WISHLIST}_REJECTED`:
                draft.data.isInitial = false;
                draft.error = action.payloadRejected.error || action.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                draft.initiated = true;
                break;
            case `${DETAIL_WISHLIST}_REJECTED`:
            case `${DELETE_ITEM_WISHLIST}_REJECTED`:
            case `${ADD_ITEM_WISHLIST}_REJECTED`:
                draft.error = action.payloadRejected.error || action.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                draft.initiated = true;
                break;
            case `${WISHLIST_ALL_LISTS}_FULFILLED`:
                draft.data.wishlists = action.payloadWishlistDataFulfilled.wishlists;
                draft.data.isInitial = true;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${ADD_WISHLIST}_FULFILLED`: {
                const wishlists: IWishlist[] = [...draft.data.wishlists, action.payloadWishlistDataFulfilled.data];
                draft.data.wishlists = wishlists;
                draft.data.isInitial = true;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${DELETE_WISHLIST}_FULFILLED`: {
                const wishlists: IWishlist[] = draft.data.wishlists.filter((
                    wishlist: IWishlist,
                ) => wishlist.id !== action.payloadWishlistDataFulfilled.wishlistId);
                draft.data.wishlists = wishlists;
                draft.data.isInitial = true;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${UPDATE_WISHLIST}_FULFILLED`: {
                const wishlists: IWishlist[] = draft.data.wishlists.map((
                    wishlist: IWishlist,
                    ) => (wishlist.id === action.payloadWishlistDataFulfilled.wishlistId)
                    ? action.payloadWishlistDataFulfilled.data
                    : wishlist
                );
                draft.data.wishlists = wishlists;
                draft.data.isInitial = true;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${DETAIL_WISHLIST}_FULFILLED`: {
                draft.data.currentWishlist = action.payloadWishlistDataFulfilled.data;
                draft.data.currentItems = action.payloadWishlistDataFulfilled.products;
                draft.data.isInitial = true;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${ADD_ITEM_WISHLIST}_FULFILLED`: {
                const wishlists: IWishlist[] = draft.data.wishlists.map((
                    wishlist: IWishlist,
                    ) => (wishlist.id === action.payloadWishlistDataFulfilled.data.id)
                    ? action.payloadWishlistDataFulfilled.data
                    : wishlist,
                );
                draft.data.wishlists = wishlists;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${DELETE_ITEM_WISHLIST}_FULFILLED`: {
                const currentItems: IWishlistProduct[] = draft.data.currentItems.filter((
                    item: IWishlistProduct,
                ) => item.sku !== action.payloadWishlistProductFulfilled.sku);
                const wishlists: IWishlist[] = draft.data.wishlists.map((
                    wishlist: IWishlist,
                    ) => wishlist.id === action.payloadWishlistProductFulfilled.wishlistId
                    ? {...wishlist, numberOfItems: currentItems.length}
                    : wishlist,
                );
                draft.data.wishlists = wishlists;
                draft.data.currentItems = currentItems;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            default:
                break;
        }
    },
    initialState,
);

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageWishlist);
}

export function isPageWishlistStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.pageWishlist && state.pageWishlist.pending && state.pageWishlist.pending === true);
}

export function isWishlistsCollectionExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageWishlist.data.wishlists);
}

export function getWishlistsCollectionFromStore(state: IReduxStore, props: IReduxOwnProps): IWishlist[] | null {
    return isWishlistsCollectionExist(state, props) ? state.pageWishlist.data.wishlists : null;
}

export function isWishlistsCollectionInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return isStateExist(state, props) ? state.pageWishlist.data.isInitial : false;
}
