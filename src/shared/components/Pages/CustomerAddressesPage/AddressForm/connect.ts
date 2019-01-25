import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { getRouterHistoryBack } from 'src/shared/helpers/router';
import { getCounties } from '@stores/reducers/common/init';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { getCurrentAddress, isPageAddressesStateLoading } from '@stores/reducers/pages/addresses';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import { addAddressAction, updateAddressAction } from '@stores/actions/pages/addresses';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { ICountry } from 'src/shared/interfaces/country';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const countries: ICountry[] = getCounties(state, ownProps);
    const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
    const customer: string | null = getCustomerReference(state, ownProps);
    const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);

    return ({
        customer,
        currentAddress,
        countries,
        routerGoBack,
        isLoading,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        addAddress: (payload: IAddressItem, customerId: string) => addAddressAction(payload, customerId),
        updateAddress: (
            addressId: string, customerId: string, payload: IAddressItem
        ) => updateAddressAction(addressId, customerId, payload),
    }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
