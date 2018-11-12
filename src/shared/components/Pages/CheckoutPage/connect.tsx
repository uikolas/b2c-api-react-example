import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import {isAppInitiated, } from 'src/shared/reducers/Common/Init';
import {
  isPageProductStateFulfilled,
  isPageProductStateInitiated,
  isPageProductStateLoading,
  isPageProductStateRejected,
} from "src/shared/reducers/Pages/Product";
import {isUserAuthenticated} from "src/shared/reducers/Pages/Login";
import {
  getProductsFromCart,
  getCartTotals,
  isCartStateFulfilled,
  isCartStateRejected,
} from "src/shared/reducers/Common/Cart";
import {ICartTotals, ICartItem, TCartId } from "src/shared/interfaces/cart";


const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const isAppDataSet: boolean = isAppInitiated(state, ownProps);
  const isLoading: boolean = isPageProductStateLoading(state, ownProps);
  const isRejected: boolean = isPageProductStateRejected(state, ownProps);
  const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
  const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);

  const products: ICartItem[] = getProductsFromCart(state, ownProps);
  const totals: ICartTotals = getCartTotals(state, ownProps);
  const isCartFulfilled: boolean = isCartStateFulfilled(state, ownProps);
  const isCartRejected: boolean = isCartStateRejected(state, ownProps);

  return ({
    isAppDataSet,
    isUserLoggedIn,
    isInitiated,
    isLoading,
    isRejected,
    isFulfilled,
    products,
    totals,
    isCartFulfilled,
    isCartRejected,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
  }),
);
