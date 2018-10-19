import { PAGES_PRODUCT_REQUEST } from '../../constants/ActionTypes/Pages/Product';
import { ProductService } from '../../services/Pages/Product';
import { IProductDataParsed } from '../../interfaces/product';

export const getProductDataItemPendingStateAction = () => ({
  type: PAGES_PRODUCT_REQUEST + '_PENDING',
});

export const getProductDataRejectedStateAction = (message: string) => ({
  type: PAGES_PRODUCT_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const getProductDataFulfilledStateAction = (payload: IProductDataParsed) => ({
  type: PAGES_PRODUCT_REQUEST + '_FULFILLED',
  payload,
});

export const getProductDataAction = function(sku: string) {
  return (dispatch: Function, getState: Function) => {
    ProductService.getAbstractData(dispatch, sku);
  };
};
