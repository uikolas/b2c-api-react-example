import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { getRouterHistoryBack } from 'src/shared/selectors/Common/router';
import { getCounties, ICountries } from 'src/shared/reducers/Common/Init';
import { ILoginState } from 'src/shared/reducers/Pages/Login';
import { IAddressesState } from 'src/shared/reducers/Pages/Addresses';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import { addAddressAction, updateAddressAction } from 'src/shared/actions/Pages/Addresses';

const mapStateToProps = (state: any, ownProps: any) => {
  const routerGoBack = getRouterHistoryBack(state, ownProps);
  const countries: ICountries[] = getCounties(state, ownProps);
  const customerProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
  const addressesProps: IAddressesState = state.pageAddresses ? state.pageAddresses : null;

  return ({
    customer: customerProps && customerProps.data ? customerProps.data.customerRef : ownProps.customer,
    currentAddress: addressesProps && addressesProps.data
      ? addressesProps.data.currentAddress
      : ownProps.currentAddress,
    countries,
    routerGoBack,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    addAddress: (payload: IAddressItem, customerId: string) => addAddressAction(payload, customerId),
    updateAddress: (
      addressId: string, customerId: string, payload: any
    ) => updateAddressAction(addressId, customerId, payload),
  }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
