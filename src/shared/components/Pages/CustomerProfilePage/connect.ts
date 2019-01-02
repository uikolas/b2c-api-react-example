import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getRouterHistoryPush } from 'src/shared/selectors/Common/router/index';
import {
  getCustomerProfile,
  isCustomerPasswordUpdated,
  isCustomerProfilePresent,
  isPageCustomerProfileFulfilled,
  isPageCustomerProfileLoading,
  isPageCustomerProfileRejected,
} from 'src/shared/reducers/Pages/CustomerProfile';
import { isAppInitiated } from 'src/shared/reducers/Common/Init/index';
import { getCustomerReference, isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import {
  ICustomerProfileIdentity,
  ICustomerProfilePassword,
  TCustomerReference,
} from 'src/shared/interfaces/customer';
import {
  deleteCustomerAction,
  getCustomerProfileAction,
  updateCustomerPasswordAction,
  updateCustomerProfileAction,
} from 'src/shared/actions/Pages/CustomerProfile';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const isLoading = isPageCustomerProfileLoading(state, ownProps);
  const isRejected = isPageCustomerProfileRejected(state, ownProps);
  const isFulfilled = isPageCustomerProfileFulfilled(state, ownProps);
  const isCustomerDataExist = isCustomerProfilePresent(state, ownProps);
  const isAppDataSet = isAppInitiated(state, ownProps);
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const customerReference = getCustomerReference(state, ownProps);
  const customerData = getCustomerProfile(state, ownProps);
  const passwordUpdated = isCustomerPasswordUpdated(state, ownProps);
  const routerPush = getRouterHistoryPush(state, ownProps);

  return ({
    isLoading,
    isRejected,
    isFulfilled,
    isCustomerDataExist,
    isAppDataSet,
    isUserLoggedIn,
    customerReference,
    customerData,
    passwordUpdated,
    routerPush,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCustomerData: (customerReference: TCustomerReference) => getCustomerProfileAction(customerReference),
      updateCustomerData: (
        customerReference: TCustomerReference, payload: ICustomerProfileIdentity
      ) => updateCustomerProfileAction(customerReference, payload),
      updateCustomerPassword: (
        customerReference: TCustomerReference, payload: ICustomerProfilePassword
      ) => updateCustomerPasswordAction(customerReference, payload),
      deleteCustomerEntity: (customerReference: TCustomerReference) => deleteCustomerAction(customerReference),
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
