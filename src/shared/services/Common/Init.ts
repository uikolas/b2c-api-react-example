import api from '../api';
import { toast } from 'react-toastify';
import {
  API_WITH_FIXTURES,
  PRICE_MODE_DEFAULT,
  CURRENCY_DEFAULT,
  STORE_DEFAULT,
} from '../../constants/Environment';
import {getTestDataPromise} from "../apiFixture/index";

interface ICartCreatePayload {
}

export class InitAppService {

  public static async getInitData(ACTION_TYPE: string, dispatch: Function, payload?: any): Promise<any> {
    try {
      let response: any;

      // TODO: this is only for development reasons - remove after finish
      const result = {
        ok: true,
        problem: 'Test API_WITH_FIXTURES',
        data: {
          priceMode: PRICE_MODE_DEFAULT,
          currency: CURRENCY_DEFAULT,
          store: STORE_DEFAULT,
        },
      };
      response = await getTestDataPromise(result);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data,
        });
        toast.success('Init data was set');
        return response.data;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
