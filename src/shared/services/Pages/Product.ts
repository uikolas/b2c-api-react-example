import api from '../api';
import { toast } from 'react-toastify';
import { parseProductResponse } from '../../helpers/product';
import {
  getProductDataFulfilledStateAction,
  getProductDataItemPendingStateAction,
  getProductDataRejectedStateAction,
} from '../../actions/Pages/Product';
import {ApiServiceAbstract} from "src/shared/services/apiAbstractions/ApiServiceAbstract";

export class ProductService extends ApiServiceAbstract {
  public static async getAbstractData(dispatch: Function, sku: string): Promise<any> {
    try {
      dispatch(getProductDataItemPendingStateAction());
      let response: any;
      response = await api.get(`abstract-products/${sku}`, {
        include: 'abstract-product-image-sets,' +
        'abstract-product-prices,' +
        'abstract-product-availabilities,' +
        'concrete-products,' +
        'concrete-product-image-sets,' +
        'concrete-product-prices,' +
        'concrete-product-availabilities',
      });

      if (response.ok) {
        const responseParsed: any = parseProductResponse(response.data);
        dispatch(getProductDataFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(getProductDataRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('Catalog catch search', error);
      dispatch(getProductDataRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
