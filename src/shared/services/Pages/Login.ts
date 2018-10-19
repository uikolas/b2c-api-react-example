import api from '../api';
import { toast } from 'react-toastify';
import { API_WITH_FIXTURES } from '../../constants/Environment';
import { fixtureLogin } from '../fixtures/loginFixture';
import { getTestDataPromise } from '../apiFixture';

export class PagesLoginService {
  public static async register(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: 'customers',
          attributes: payload,
        },
      };
      const response: any = await api.post('customers', body, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data,
        });
        toast.success('You have successfully registered');
        return response.data;
      } else {
        console.error('register', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('register', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async loginRequest(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: 'access-tokens',
          attributes: payload,
        },
      };

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if (API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: fixtureLogin.data,
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.post('access-tokens', body, {withCredentials: true});
      }

      console.info('loginRequest result', response);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data.data.attributes,
        });
        toast.success('You are now logged in');
        return response.data.data.attributes;
      } else {
        console.error('login', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('login', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected error: ' + error);
      return null;
    }
  }
}
