import {config} from '../../config';
import api from '../api/ApiClient';


export class PagesLoginService {
  public static async register(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: "customers",
          attributes: payload,
        }
      };
      const respose: any = await api.post('customers', body);
      console.info(respose);

      if (respose.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: respose.data,
        });
        return respose.data;
      } else {
        console.error('register', respose.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: respose.problem,
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
        "data": {
          "type": "string",
          "attributes": {
            "username": "string",
            "password": "string"
          },
          "links": {
            "self": "string"
          }
        }
      };

      const result: any = await api.post(`${config.API_URL}access-tokens`, payload );
      console.info(result);

      dispatch({
        type: ACTION_TYPE + '_FULFILLED',
        payload: result,
      });
      return result;

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
