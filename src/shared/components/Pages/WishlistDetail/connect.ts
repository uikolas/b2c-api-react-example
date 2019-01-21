import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { RouteProps } from 'react-router';
import { WishlistState } from '@stores/reducers/pages/wishlist';
import { getAppCurrency, TAppCurrency } from '@stores/reducers/common/init';
import { TCartId } from 'src/shared/interfaces/cart';
import { deleteItemAction, deleteMultiItemsAction } from '@stores/actions/pages/wishlist';
import { addItemToCartAction, multiItemsCartAction } from '@stores/actions/common/cart';
import { push } from 'react-router-redux';
import {getCartId, getTotalItemsQuantity, isCartStateLoading} from "@stores/reducers/common/cart/selectors";

const mapStateToProps = (state: any, ownProps: any) => {
  const routerProps: RouteProps = state.routing ? state.routing : {};
  const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);
  const cartId: TCartId = getCartId(state, ownProps);
  const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
  const cartLoading: boolean = isCartStateLoading(state, ownProps);

  return ({
    location: routerProps.location ? routerProps.location : ownProps.location,
    wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : ownProps.wishlist,
    products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : ownProps.products,
    isLoading: wishlistProps ? wishlistProps.pending : ownProps.isLoading,
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
