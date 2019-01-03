import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { WishlistState } from 'src/shared/reducers/Pages/Wishlist/types';
import {
  addWishlistAction,
  deleteWishlistAction,
  getDetailWishlistAction,
  getWishlistsAction,
  updateWishlistAction,
} from 'src/shared/actions/Pages/Wishlist';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;

  return ({
    wishlists: wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : null,
    isInitial: wishlistProps && wishlistProps.data ? wishlistProps.data.isInitial : false,
    isLoading: wishlistProps ? wishlistProps.pending : false,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addWishlistAction,
      deleteWishlistAction,
      getDetailWishlistAction,
      getWishlistsAction,
      updateWishlistAction,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
