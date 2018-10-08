import {
  WISHLIST_ALL_LISTS,
  ADD_WISHLIST,
  DELETE_WISHLIST,
  UPDATE_WISHLIST,
  DETAIL_WISHLIST,
  ADD_ITEM_WISHLIST,
  DELETE_ITEM_WISHLIST,
} from '../../constants/ActionTypes/Pages/Wishlist';
import {WishlistService} from '../../services/Pages/Wishlist';


export const getAllListPendingState = {
  type: WISHLIST_ALL_LISTS + '_PENDING',
};

export const addWishlistPendingState = {
  type: ADD_WISHLIST + '_PENDING',
};

export const updateWishlistPendingState = {
  type: UPDATE_WISHLIST + '_PENDING',
};

export const deleteWishlistPendingState = {
  type: DELETE_WISHLIST + '_PENDING',
};

export const detailWishlistPendingState = {
  type: DETAIL_WISHLIST + '_PENDING',
};

export const getWishlistsAction = function () {
  return (dispatch: Function, getState: Function) => {
    dispatch(getAllListPendingState);
    WishlistService.getLists(WISHLIST_ALL_LISTS, dispatch);
  };
};

export const addWishlistAction = function (name: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(addWishlistPendingState);
    WishlistService.addWishlist(ADD_WISHLIST, dispatch, name);
  };
};

export const updateWishlistAction = function (wishlistId: string, name: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(updateWishlistPendingState);
    WishlistService.updateWishlist(UPDATE_WISHLIST, dispatch, wishlistId, name);
  };
};

export const deleteWishlistAction = function (wishlistId: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(deleteWishlistPendingState);
    WishlistService.deleteWishlist(DELETE_WISHLIST, dispatch, wishlistId);
  };
};

export const getDetailWishlistAction = function (wishlistId: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(detailWishlistPendingState);
    WishlistService.getWishlist(DETAIL_WISHLIST, dispatch, wishlistId);
  };
};
