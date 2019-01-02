import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { WishlistState } from 'src/shared/reducers/Pages/Wishlist';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init/Init';
import { TCartId } from 'src/shared/interfaces/cart';
import { deleteItemAction, deleteMultiItemsAction } from 'src/shared/actions/Pages/Wishlist';
import { addItemToCartAction, multiItemsCartAction } from 'src/shared/actions/Common/Cart';
import { push } from 'react-router-redux';
import {getCartId, getTotalItemsQuantity, isCartStateLoading} from "src/shared/reducers/Common/Cart/selectors";
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);
  const cartId: TCartId = getCartId(state, ownProps);
  const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
  const cartLoading: boolean = isCartStateLoading(state, ownProps);

  return ({
    wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null,
    products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : null,
    isLoading: wishlistProps ? wishlistProps.pending : false,
    currency,
    cartId,
    cartItemsLength,
    cartLoading,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeLocation: (location: string) => push(location),
      deleteItemAction,
      addItemToCartAction,
      multiItemsCartAction,
      deleteMultiItemsAction,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
