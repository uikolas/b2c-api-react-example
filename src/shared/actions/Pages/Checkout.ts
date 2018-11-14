import { CHECKOUT_DATA_INIT_REQUEST } from 'src/shared/constants/ActionTypes/Pages/Checkout';

export const getCheckoutDataInitPendingStateAction = () => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_PENDING',
});

export const getCheckoutDataInitRejectedStateAction = (message: string) => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const getCheckoutDataInitFulfilledStateAction = (payload: any) => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
  payload,
});

export const getCheckoutDataAction = function(sku: string) {
  return (dispatch: Function, getState: Function) => {
    // ProductService.getAbstractData(dispatch, sku);
  };
};
