import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { getRouterHistoryPush } from 'src/shared/selectors/Common/router';
import { getCustomerReference } from 'src/shared/reducers/Pages/Login';
import {
  getAddressesCollection,
  getCurrentAddress,
  isPageAddressesStateLoading,
  isAddressesInitiated,
} from 'src/shared/reducers/Pages/Addresses';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import {
  getAddressesAction,
  setCurrentAddressAction,
  deleteAddressAction,
} from 'src/shared/actions/Pages/Addresses';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const routerPush: Function = getRouterHistoryPush(state, ownProps);
  const customer: string | null = getCustomerReference(state, ownProps);
  const addresses: IAddressItem[] = getAddressesCollection(state, ownProps);
  const currentAddress: IAddressItem = getCurrentAddress(state, ownProps);
  const isLoading: boolean = isPageAddressesStateLoading(state, ownProps);
  const isAddressesInit: boolean = isAddressesInitiated(state, ownProps);

  return ({
    customer,
    currentAddress,
    addresses,
    routerPush,
    isLoading,
    isAddressesInit,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    getAddressesAction,
    setCurrentAddressAction,
    deleteAddressAction,
  }, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
