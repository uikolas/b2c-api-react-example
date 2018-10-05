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
import {IWishlist} from '../../interfaces/wishlist';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";

export interface WishlistState extends IReduxState {
  data: {
    wishlists: IWishlist[],
  };
}

export const initialState: WishlistState = {
  data: {
    wishlists: [],
  },
};


export const pageWishlist = function (state: WishlistState = initialState, action: any): WishlistState {
  switch (action.type) {
    case `${WISHLIST_ALL_LISTS}_PENDING`:
    case `${ADD_WISHLIST}_PENDING`:
    case `${DELETE_WISHLIST}_PENDING`:
    case `${UPDATE_WISHLIST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${WISHLIST_ALL_LISTS}_REJECTED`:
    case `${ADD_WISHLIST}_REJECTED`:
    case `${DELETE_WISHLIST}_REJECTED`:
    case `${UPDATE_WISHLIST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${WISHLIST_ALL_LISTS}_FULFILLED`:
      return {
        ...state,
        data: {...state.data, wishlists: action.wishlists},
        ...getReducerPartFulfilled(),
      };
    case `${ADD_WISHLIST}_FULFILLED`: {
      const wishlists = [...state.data.wishlists, action.wishlist];
      return {
        ...state,
        data: {...state.data, wishlists},
        ...getReducerPartFulfilled(),
      };
    }
    case `${DELETE_WISHLIST}_FULFILLED`: {
      const wishlists = state.data.wishlists.filter((wishlist: IWishlist) => wishlist.id !== action.wishlistId);
      return {
        ...state,
        data: {...state.data, wishlists},
        ...getReducerPartFulfilled(),
      };
    }
    case `${UPDATE_WISHLIST}_FULFILLED`: {
      const wishlists = state.data.wishlists.map((wishlist: IWishlist) => wishlist.id === action.wishlistId ? action.data : wishlist);
      return {
        ...state,
        data: {...state.data, wishlists},
        ...getReducerPartFulfilled(),
      };
    }
    default:
      return state;
  }
};
