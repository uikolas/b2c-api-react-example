import {
  WISHLIST_ALL_LISTS,
  ADD_WISHLIST,
  DELETE_WISHLIST,
  UPDATE_WISHLIST,
  DETAIL_WISHLIST,
  ADD_ITEM_WISHLIST,
  DELETE_ITEM_WISHLIST,
} from '../../constants/ActionTypes/Pages/Wishlist';
import {
  IReduxState,
} from '../../../typings/app';
import {IWishlist, IWishlistItem} from '../../interfaces/wishlist';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";

export interface WishlistState extends IReduxState {
  data: {
    wishlists: IWishlist[],
    currentWishlist: IWishlist | null,
    currentItems: Array<IWishlistItem>,
    isInitial: boolean,
  };
}

export const initialState: WishlistState = {
  data: {
    wishlists: [],
    currentWishlist: null,
    currentItems: [],
    isInitial: false,
  },
};


export const pageWishlist = function (state: WishlistState = initialState, action: any): WishlistState {
  switch (action.type) {
    case `${WISHLIST_ALL_LISTS}_PENDING`:
    case `${ADD_WISHLIST}_PENDING`:
    case `${DELETE_WISHLIST}_PENDING`:
    case `${UPDATE_WISHLIST}_PENDING`:
    case `${DELETE_ITEM_WISHLIST}_PENDING`:
    case `${ADD_ITEM_WISHLIST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${DETAIL_WISHLIST}_PENDING`:
      return {
        ...state,
        data: {...state.data, currentWishlist: null, currentItems: []},
        ...getReducerPartPending(),
      };
    case `${WISHLIST_ALL_LISTS}_REJECTED`:
    case `${ADD_WISHLIST}_REJECTED`:
    case `${DELETE_WISHLIST}_REJECTED`:
    case `${UPDATE_WISHLIST}_REJECTED`:
      return {
        ...state,
        data: {...state.data, isInitial: false},
        ...getReducerPartRejected(action.error),
      };
    case `${DETAIL_WISHLIST}_REJECTED`:
    case `${DELETE_ITEM_WISHLIST}_REJECTED`:
    case `${ADD_ITEM_WISHLIST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${WISHLIST_ALL_LISTS}_FULFILLED`:
      return {
        ...state,
        data: {...state.data, wishlists: action.wishlists, isInitial: true},
        ...getReducerPartFulfilled(),
      };
    case `${ADD_WISHLIST}_FULFILLED`: {
      const wishlists: IWishlist[] = [...state.data.wishlists, action.wishlist];
      return {
        ...state,
        data: {...state.data, wishlists, isInitial: true},
        ...getReducerPartFulfilled(),
      };
    }
    case `${DELETE_WISHLIST}_FULFILLED`: {
      const wishlists: IWishlist[] = state.data.wishlists.filter((wishlist: IWishlist) => wishlist.id !== action.wishlistId);
      return {
        ...state,
        data: {...state.data, wishlists, isInitial: true},
        ...getReducerPartFulfilled(),
      };
    }
    case `${UPDATE_WISHLIST}_FULFILLED`: {
      const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) => wishlist.id === action.wishlistId ? action.data : wishlist);
      return {
        ...state,
        data: {...state.data, wishlists, isInitial: true},
        ...getReducerPartFulfilled(),
      };
    }
    case `${DETAIL_WISHLIST}_FULFILLED`: {
      return {
        ...state,
        data: {...state.data, currentWishlist: action.wishlist, currentItems: action.items},
        ...getReducerPartFulfilled(),
      };
    }
    case `${ADD_ITEM_WISHLIST}_FULFILLED`: {
      const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) => wishlist.id === action.wishlist.id
        ? action.wishlist
        : wishlist
      );
      return {
        ...state,
        data: {...state.data, wishlists},
        ...getReducerPartFulfilled(),
      };
    }
    case `${DELETE_ITEM_WISHLIST}_FULFILLED`: {
      const currentItems: IWishlistItem[] = state.data.currentItems.filter((item: IWishlistItem) => item.sku !== action.sku);
      const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) => wishlist.id === action.wishlistId
        ? {...wishlist, numberOfItems: currentItems.length}
        : wishlist
      );
      return {
        ...state,
        data: {...state.data, wishlists, currentItems},
        ...getReducerPartFulfilled(),
      };
    }

    default:
      return state;
  }
};

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageWishlist);
}

export function isPageWishlistStateLoading(state: any, props: any): boolean {
  return (state.pageWishlist && state.pageWishlist.pending && state.pageWishlist.pending === true);
}

export function isWishlistsCollectionExist(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageWishlist.data.wishlists);
}

export function getWishlistsCollectionFromStore(state: any, props: any): IWishlist[] | null {
  return isWishlistsCollectionExist(state, props) ? state.pageWishlist.data.wishlists : null;
}

export function isWishlistsCollectionInitiated(state: any, props: any): boolean {
  return isStateExist(state, props) ? state.pageWishlist.data.isInitial : false;
}
