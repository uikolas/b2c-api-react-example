import api from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {
  fixtureError,
  fixtureFull,
  fixtureOneProduct, fixtureProductImages,
  fixtureProductPrices,
  fixtureSuperFull
} from '../fixtures/productFixtureWithSuperAttr';
import {parseProductResponse} from "../productHelper";
import {
  getProductDataFulfilledStateAction,
  getProductDataItemPendingStateAction,
  getProductDataRejectedStateAction
} from "../../actions/Pages/Product";

export class ProductService {
  public static async getAbstractData(dispatch: Function, sku: string): Promise<any> {
    try {
      dispatch(getProductDataItemPendingStateAction());
      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        response = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: fixtureProductImages,
        };
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.get(`abstract-products/${sku}`, {
          include: 'abstract-product-image-sets,' +
            'abstract-product-prices,' +
            'abstract-product-availabilities,' +
            'concrete-products,' +
            'concrete-product-image-sets,' +
            'concrete-product-prices,' +
            'concrete-product-availabilities'
        });
      }
      if (response.ok) {
        const responseParsed: any = parseProductResponse(response.data);
        dispatch(getProductDataFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        let errorMessage = response.problem;
        if (response.data.errors[0].detail) {
          errorMessage = response.data.errors[0].detail;
        }
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
