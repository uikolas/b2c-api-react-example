import {config} from '../../config';
import ApiClient from '../api/ApiClient';

const api = new ApiClient();

export class PagesLoginService {
  public static async register(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      // const body = {
      //   "data": {
      //     "type": "customers",
      //     "attributes": {
      //       "salutation": "Mr",
      //       "firstName": "First",
      //       "lastName": "test",
      //       "email": "zfort@test.com",
      //       "password": "zzzzzzzz",
      //       "passwordConfirmation": "zzzzzzzz",
      //       "acceptedTerms": true
      //     }
      //   }
      // };

      const body = {
        data: {
          type: "customers",
          attributes: payload,
        }
      };
      const result: any = await api.post(`${config.API_URL}customers`, body )
      console.info(result);

      dispatch({
        type: ACTION_TYPE + '_FULFILLED',
        payload: result,
      });
      return result;

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
