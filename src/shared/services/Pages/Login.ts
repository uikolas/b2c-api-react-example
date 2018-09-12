import {config} from '../../config';
import api from '../api/ApiClient';
import {response} from 'spdy';


export class PagesLoginService {
  public static async register(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: "customers",
          attributes: payload,
        }
      };
      const response: any = await api.post('customers', body, { withCredentials: true });
      console.info(response);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data,
        });
        return response.data;
      } else {
        console.error('register', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        return null;
      }

    } catch (error) {
      console.error('register', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      return null;
    }
  }

  public static async loginRequest(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: "access-tokens",
          attributes: payload,
        }
      };

      const response: any = await api.post('access-tokens', body );
      console.info('loginRequest result', response);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data,
        });
        return response.data;
      } else {
        console.error('login', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        return null;
      }

    } catch (error) {
      console.error('login', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      return null;
    }
  }
}
