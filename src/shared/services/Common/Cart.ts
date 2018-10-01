import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {cartCreateFixture} from './cartFixture';
import {getTestDataPromise} from "../apiFixture/index";

interface ICartCreatePayload {
  priceMode: string;
  currency: string;
  store: string;
}

export class CartService {

  public static async cartCreate(ACTION_TYPE: string, dispatch: Function, payload: ICartCreatePayload, accessToken: string): Promise<any> {
    try {
      const body = {
        data: {
          type: "cart",
          attributes: payload,
        }
      }
      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: cartCreateFixture.data,
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        setAuthToken(accessToken);
        const response: any = await api.post('carts', body, { withCredentials: true });
      }

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data,
        });
        toast.success('You have successfully created a cart');
        return response.data;
      } else {
        console.error('register', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: {error: response.problem},
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('register', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payload: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
