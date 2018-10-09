import api from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {
  fixtureError,
  fixtureFull,
  fixtureOneProduct,
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
          data: fixtureProductPrices,
        };
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.get(`abstract-products/${sku}`);
      }
      if (response.ok) {
        const responseParsed: any = parseProductResponse(response.data);
        dispatch(getProductDataFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(getProductDataRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
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
