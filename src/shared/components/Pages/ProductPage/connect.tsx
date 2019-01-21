import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getAnonymId, getPayloadForCreateCart, isAppInitiated } from '@stores/reducers/common/init';
import {
  getProduct,
  isPageProductStateFulfilled,
  isPageProductStateInitiated,
  isPageProductStateLoading,
  isPageProductStateRejected,
  isProductDetailsPresent,
} from '@stores/reducers/pages/product';
import {
  getWishlistsCollectionFromStore,
  isPageWishlistStateLoading,
  isWishlistsCollectionInitiated,
} from '@stores/reducers/pages/wishlist';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getRouterLocation, getRouterMatchParam } from 'src/shared/selectors/Common/router';
import { ICartCreatePayload } from 'src/shared/services/Common/Cart/types';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import {getProductAvailabilityAction, getProductDataAction} from '@stores/actions/pages/product';
import { addItemAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import {
  addItemGuestCartAction,
  addItemToCartAction,
  createCartAndAddItemAction,
} from '@stores/actions/common/cart';
import {TProductSKU} from "src/shared/interfaces/product/index";
import {getCartId, isCartCreated} from "@stores/reducers/common/cart/selectors";

const mapStateToProps = (state: any, ownProps: any) => {
  const location = getRouterLocation(state, ownProps);
  const product = getProduct(state, ownProps);
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const cartCreated: boolean = isCartCreated(state, ownProps);
  const cartId: TCartId = getCartId(state, ownProps);
  const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
  const isAppDataSet: boolean = isAppInitiated(state, ownProps);
  const isLoading: boolean = isPageProductStateLoading(state, ownProps);
  const isRejected: boolean = isPageProductStateRejected(state, ownProps);
  const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
  const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
  const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
  const isProductExist: boolean = isProductDetailsPresent(state, ownProps);
  const isWishListLoading: boolean = isPageWishlistStateLoading(state, ownProps);
  const wishLists = getWishlistsCollectionFromStore(state, ownProps);
  const isWishListsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
  const anonymId = getAnonymId(state, ownProps);

  return ({
    location,
    product,
    cartCreated,
    cartId,
    isAppDataSet,
    payloadForCreateCart,
    isUserLoggedIn,
    isInitiated,
    isLoading,
    isRejected,
    isFulfilled,
    locationProductSKU,
    wishLists,
    isWishListsFetched,
    isProductExist,
    isWishListLoading,
    anonymId,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
    getProductData: (sku: string) => dispatch(getProductDataAction(sku)),
    getWishLists: () => dispatch(getWishlistsAction()),
    addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemAction(wishlistId, sku)),
    createCartAndAddItem: (
      payload: ICartCreatePayload,
      item: ICartAddItem
    ) => dispatch(createCartAndAddItemAction(payload, item)),
    addItemToCart: (payload: ICartAddItem, cartId: TCartId) => dispatch(addItemToCartAction(payload, cartId)),
    addItemGuestCart: (item: ICartAddItem, anonymId: string) => dispatch(addItemGuestCartAction(item, anonymId)),
    getProductAvailability: (sku: TProductSKU) => dispatch(getProductAvailabilityAction(sku)),
  }),
);
