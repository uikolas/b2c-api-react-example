import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getAnonymId, isAppInitiated } from '@stores/reducers/common/init';
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
} from '@stores/reducers/Pages/Wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getRouterMatchParam } from 'src/shared/helpers/router';
import { getProductDataAction } from '@stores/actions/pages/product';
import { addItemAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const product = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
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
        product,
        isAppDataSet,
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
    }),
);
