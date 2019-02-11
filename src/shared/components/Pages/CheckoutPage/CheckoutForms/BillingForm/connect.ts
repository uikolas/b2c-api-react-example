import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore, isPageCheckoutFulfilled } from '@stores/reducers/pages/checkout';
import { ICountry } from '@interfaces/country';
import { getCounties } from '@stores/reducers/common/init';
import { ICheckoutRequest } from '@interfaces/checkout';
import {
    mutateStateNewAddressBillingAction,
    mutateStateBillingSelectionAddNewAction,
    mutateStateBillingSelectionAddressIdAction,
    mutateStateBillingSelectionSameAsDeliveryAction,
    mutateBillingStepAction,
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const isAddressesCollectionExist: boolean = addressesCollection && addressesCollection.length > 0;
    const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);
    const countriesCollection: ICountry[] = getCounties(state, ownProps);
    const billingNewAddress = state.pageCheckout.billingNewAddress;
    const billingSelection = state.pageCheckout.billingSelection;

    return {
        isUserLoggedIn,
        addressesCollection,
        isAddressesCollectionExist,
        isCheckoutFulfilled,
        countriesCollection,
        billingNewAddress,
        billingSelection
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateNewAddressBilling: (payload: any): void => {
        dispatch(mutateStateNewAddressBillingAction(payload));
    },
    mutateStateBillingSelectionAddNew: (): void => {
        dispatch(mutateStateBillingSelectionAddNewAction());
    },
    mutateStateBillingSelectionAddressId: (payload: string): void => {
        dispatch(mutateStateBillingSelectionAddressIdAction(payload));
    },
    mutateStateBillingSelectionSameAsDelivery: (): void => {
        dispatch(mutateStateBillingSelectionSameAsDeliveryAction());
    },
    mutateBillingStep: (payload: boolean): void => {
        dispatch(mutateBillingStepAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
