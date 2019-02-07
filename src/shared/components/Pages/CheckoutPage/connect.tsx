import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getAnonymId, getCounties, isAppInitiated } from '@stores/reducers/common/init';
import { ICartTotals, ICartItem, TCartId } from '@interfaces/cart';
import { ICheckoutRequest, IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { getCustomerReference, isUserAuthenticated } from '@stores/reducers/pages/login';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';
import { isStateLoading } from '@stores/reducers';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getCheckoutDataAction, sendCheckoutDataAction } from '@stores/actions/pages/checkout';
import { getCustomerCartsAction, getGuestCartAction } from '@stores/actions/common/cart';
import {
    getAddressesCollectionFromCheckoutStore,
    getPaymentMethodsFromStore,
    getShipmentMethodsFromStore,
    getCreatedOrder,
    isPageCheckoutFulfilled,
    isPageCheckoutStateLoading,
    isPageCheckoutStateRejected,
} from '@stores/reducers/pages/checkout';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { TCustomerReference } from '@interfaces/customer';
import { getCartId, getCartTotals, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICountry } from '@interfaces/country';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isCheckoutLoading: boolean = isPageCheckoutStateLoading(state, ownProps);
    const isCheckoutRejected: boolean = isPageCheckoutStateRejected(state, ownProps);
    const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);

    const {items}: { items: ICartItem[] } = getProductsFromCart(state, ownProps);
    const isProductsExists = Boolean(items && items.length);
    const totals: ICartTotals = getCartTotals(state, ownProps);

    const cartId: TCartId = getCartId(state, ownProps);

    // from ILoginState
    const customerReference = getCustomerReference(state, ownProps);
    const profile = getCustomerProfile(state, ownProps);

    // from global state
    const isAppStateLoading = isStateLoading(state, ownProps);
    // Countries from init state
    const countriesCollection: ICountry[] = getCounties(state, ownProps);
    // From pageCheckout state
    const shipmentMethods: IShipmentMethod[] | null = getShipmentMethodsFromStore(state, ownProps);
    const paymentMethods: IPaymentMethod[] | null = getPaymentMethodsFromStore(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null = getAddressesCollectionFromCheckoutStore(
        state,
        ownProps
    );
    const orderId: string = getCreatedOrder(state, ownProps);
    const isAddressesCollectionExist: boolean = addressesCollection && addressesCollection.length > 0;

    return ({
        isAppDataSet,
        isUserLoggedIn,
        isCheckoutLoading,
        isCheckoutRejected,
        isCheckoutFulfilled,
        products: items,
        isProductsExists,
        totals,
        cartId,
        customerReference,
        addressesCollection,
        isAddressesCollectionExist,
        isAppStateLoading,
        countriesCollection,
        shipmentMethods,
        paymentMethods,
        orderId,
        profile,
        anonymId,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getCheckoutData: (payload: ICheckoutRequest, anonymId: string): void => {
            dispatch(getCheckoutDataAction(payload, anonymId));
        },
        sendCheckoutData: (payload: ICheckoutRequest, anonymId: string): void => {
            dispatch(sendCheckoutDataAction(payload, anonymId));
        },
        getCustomerData: (customerReference: TCustomerReference): void => {
            dispatch(getCustomerProfileAction(customerReference));
        },
        updateCart: (): void => dispatch(getCustomerCartsAction()),
        updateGuestCart: (anonymId: string): void => {
            dispatch(getGuestCartAction(anonymId));
        },
    }),
);
