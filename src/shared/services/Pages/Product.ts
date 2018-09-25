import api from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {fixtureFull, fixtureOneProduct} from './productFixtureWithSuperAttr';
import {parseProductResponse} from "../productHelper";

export class ProductService {
  public static async getAbstractData(ACTION_TYPE: string, dispatch: Function, sku: string): Promise<any> {
    try {

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        response = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: fixtureFull,
        };
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.get(`abstract-products/${sku}`);
      }
      if (response.ok) {
        const result: any = parseProductResponse(response.data);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: result,
        });
        return result;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Catalog catch search', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
