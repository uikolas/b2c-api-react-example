import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getCounties, ICountries, isAppInitiated } from 'src/shared/reducers/Common/Init';
import {
  isPageProductStateFulfilled,
  isPageProductStateInitiated,
  isPageProductStateLoading,
  isPageProductStateRejected,
} from "src/shared/reducers/Pages/Product";
import {ICartTotals, ICartItem, TCartId} from "src/shared/interfaces/cart";
import {ICheckoutRequest} from "src/shared/interfaces/checkout";
import {getCustomerReference, isUserAuthenticated} from "src/shared/reducers/Pages/Login";
import {
  getProductsFromCart,
  isCartStateLoading,
  getCartTotals,
  isCartStateFulfilled,
  isCartStateRejected
} from "src/shared/reducers/Common/Cart";
import { TCustomerId, TCustomerReference } from "src/shared/interfaces/customer";
import { getAddressesAction } from "src/shared/actions/Pages/Addresses";
import { getCheckoutDataAction, sendCheckoutDataAction } from "src/shared/actions/Pages/Checkout";
import {
  getAddressesCollectionFromStore,
  getCurrentAddressFromStore,
  isPageAddressesFulfilled,
  isPageAddressesStateLoading
} from "src/shared/reducers/Pages/Addresses";
import {isStateLoading} from "src/shared/reducers";


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
  const isCartLoading = isCartStateLoading(state, ownProps);
  // from ILoginState
  const customerReference = getCustomerReference(state, ownProps);
  const currentAddress = getCurrentAddressFromStore(state, ownProps);
  const addressesCollection = getAddressesCollectionFromStore(state, ownProps);
  const isAddressesLoading = isPageAddressesStateLoading(state, ownProps);
  const isAddressesFulfilled = isPageAddressesFulfilled(state, ownProps);
  // from global state
  const isAppStateLoading = isStateLoading(state, ownProps);
  // Countries from init state
  const countriesCollection: ICountries[] = getCounties(state, ownProps);

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
    isCartLoading,
    customerReference,
    currentAddress,
    addressesCollection,
    isAddressesLoading,
    isAddressesFulfilled,
    isAppStateLoading,
    countriesCollection,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
    getAddressesList: (customerRef: TCustomerReference) => dispatch(getAddressesAction(customerRef)),
    getCheckoutData: (payload: ICheckoutRequest) => dispatch(getCheckoutDataAction(payload)),
    sendCheckoutData: (payload: ICheckoutRequest) => dispatch(sendCheckoutDataAction(payload)),
  }),
);
