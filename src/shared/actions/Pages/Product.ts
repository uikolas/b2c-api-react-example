import {
  PAGES_PRODUCT_REQUEST,
} from '../../constants/ActionTypes/Pages/Product';
import { ProductService } from '../../services/Pages/Product';


export const productPendingState = {
  type: PAGES_PRODUCT_REQUEST + '_PENDING',
};

export const getProductDataAction = function (sku: string) {
  return (dispatch: Function, getState: Function) => {
    ProductService.getAbstractData(PAGES_PRODUCT_REQUEST, dispatch, sku);
    dispatch(productPendingState);
  };
};
