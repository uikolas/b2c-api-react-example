import { toast } from 'react-toastify';
import jwtDecoder from 'jwt-decode';
import api from '../api';
import {API_WITH_FIXTURES} from "../../constants/Environment/index";
import {fixtureLogin} from "../fixtures/loginFixture";
import {getTestDataPromise} from "../apiFixture/index";
import {saveLoginDataToLocalStorageAction} from "../../actions/Pages/CustomerProfile";
import {parseLoginDataResponse} from "../customerHelper/loginDataResponse";

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

      if (response.ok) {
        dispatch(saveLoginDataToLocalStorageAction({email: payload.email}));
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
          type: "access-tokens",
          attributes: payload,
        }
      };

      const response: any = await api.post('access-tokens', body, { withCredentials: true });
      if (response.ok) {
        const responseParsed = parseLoginDataResponse(response.data);
        const {sub}: {sub: string} = jwtDecoder(responseParsed.accessToken);
        dispatch(saveLoginDataToLocalStorageAction({email: payload.username}));

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: responseParsed,
          customerRef: JSON.parse(sub).customer_reference,
        });
        toast.success('You are now logged in');
        return responseParsed;
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
