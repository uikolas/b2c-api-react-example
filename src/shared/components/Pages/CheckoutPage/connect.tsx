import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import {getCounties, ICountries, isAppInitiated} from 'src/shared/reducers/Common/Init';
import {ICartTotals, ICartItem} from "src/shared/interfaces/cart";
import {ICheckoutRequest, IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout";
import {getCustomerReference, isUserAuthenticated} from "src/shared/reducers/Pages/Login";
import {
  getProductsFromCart,
  isCartStateLoading,
  getCartTotals,
  isCartStateFulfilled,
  isCartStateRejected
} from "src/shared/reducers/Common/Cart";
import {
  checkAddressesCollectionExist,
} from "src/shared/reducers/Pages/Addresses";
import {isStateLoading} from "src/shared/reducers";
import {IAddressItemCollection} from "src/shared/interfaces/addresses";
import {getCheckoutDataAction, sendCheckoutDataAction} from "src/shared/actions/Pages/Checkout";
import {
  getAddressesCollectionFromCheckoutStore,
  getPaymentMethodsFromStore,
  getShipmentMethodsFromStore,
  isPageCheckoutFulfilled,
  isPageCheckoutStateLoading,
  isPageCheckoutStateRejected
} from "src/shared/reducers/Pages/Checkout";


const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const isAppDataSet: boolean = isAppInitiated(state, ownProps);
  const isCheckoutLoading: boolean = isPageCheckoutStateLoading(state, ownProps);
  const isCheckoutRejected: boolean = isPageCheckoutStateRejected(state, ownProps);

  // TODO: Change it after we have real endpoint
  // const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);
  const isCheckoutFulfilled: boolean = true;

  const {items}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);
  const totals: ICartTotals = getCartTotals(state, ownProps);
  const isCartFulfilled: boolean = isCartStateFulfilled(state, ownProps);
  const isCartRejected: boolean = isCartStateRejected(state, ownProps);
  const isCartLoading = isCartStateLoading(state, ownProps);
  // from ILoginState
  const customerReference = getCustomerReference(state, ownProps);
  const addressesCollection: IAddressItemCollection[] | null = getAddressesCollectionFromCheckoutStore(state, ownProps);
  const isAddressesCollectionExist: boolean = checkAddressesCollectionExist(state, ownProps);
  // from global state
  const isAppStateLoading = isStateLoading(state, ownProps);
  // Countries from init state
  const countriesCollection: ICountries[] = getCounties(state, ownProps);
  // From pageCheckout state
  const shipmentMethods: Array<IShipmentMethod> | null = getShipmentMethodsFromStore(state, ownProps);
  const paymentMethods: Array<IPaymentMethod> | null = getPaymentMethodsFromStore(state, ownProps);

  return ({
    isAppDataSet,
    isUserLoggedIn,
    isCheckoutLoading,
    isCheckoutRejected,
    isCheckoutFulfilled,
    products: items,
    totals,
    isCartFulfilled,
    isCartRejected,
    isCartLoading,
    customerReference,
    addressesCollection,
    isAddressesCollectionExist,
    isAppStateLoading,
    countriesCollection,
    shipmentMethods,
    paymentMethods,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
    getCheckoutData: (payload: ICheckoutRequest) => dispatch(getCheckoutDataAction(payload)),
    sendCheckoutData: (payload: ICheckoutRequest) => dispatch(sendCheckoutDataAction(payload)),
  }),
);
