import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getAddressesCollectionFromCheckoutStore, isPageCheckoutFulfilled } from '@stores/reducers/pages/checkout';
import { ICountry } from '@interfaces/country';
import { getCounties } from '@stores/reducers/common/init';
import { ICheckoutRequest } from '@interfaces/checkout';
import {
    mutateStateNewAddressDeliveryAction,
    mutateStateDeliverySelectionAddNewAction,
    mutateStateDeliverySelectionAddressIdAction,
    mutateDeliveryStepAction
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const addressesCollection: IAddressItemCollection[] | null =
        getAddressesCollectionFromCheckoutStore(state, ownProps);
    const isAddressesCollectionExist: boolean = addressesCollection && addressesCollection.length > 0;
    const isCheckoutFulfilled: boolean = isPageCheckoutFulfilled(state, ownProps);
    const countriesCollection: ICountry[] = getCounties(state, ownProps);
    const deliveryNewAddress = state.pageCheckout.deliveryNewAddress;
    const deliverySelection = state.pageCheckout.deliverySelection;

    return {
        isUserLoggedIn,
        addressesCollection,
        isAddressesCollectionExist,
        isCheckoutFulfilled,
        countriesCollection,
        deliveryNewAddress,
        deliverySelection
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateNewAddressDelivery: (payload: any): void => {
        dispatch(mutateStateNewAddressDeliveryAction(payload));
    },
    mutateStateDeliverySelectionAddNew: (): void => {
        dispatch(mutateStateDeliverySelectionAddNewAction());
    },
    mutateStateDeliverySelectionAddressId: (payload: string): void => {
        dispatch(mutateStateDeliverySelectionAddressIdAction(payload));
    },
    mutateDeliveryStep: (payload: boolean): void => {
        dispatch(mutateDeliveryStepAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
