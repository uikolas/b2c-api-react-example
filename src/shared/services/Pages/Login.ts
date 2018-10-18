import { toast } from 'react-toastify';
import api from '../api';
import {saveLoginDataToLocalStorageAction} from "../../actions/Pages/CustomerProfile";
import {
  parseLoginDataResponse,
  saveAccessDataToLocalStorage, saveCustomerUsernameToLocalStorage,
} from "../customerHelper/loginDataResponse";
import {
  loginCustomerFulfilledStateAction,
  loginCustomerPendingStateAction,
  loginCustomerRejectedStateAction
} from "../../actions/Pages/Login";
import {ApiServiceAbstract} from "../apiHelper/ApiServiceAbstract";
import {ICustomerLoginData} from "../../interfaces/customer/index";

export class PagesLoginService extends ApiServiceAbstract {
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
        saveCustomerUsernameToLocalStorage({email: payload.username});
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

  public static async loginRequest(dispatch: Function, payload: ICustomerLoginData): Promise<any> {
    try {
      dispatch(loginCustomerPendingStateAction());

      let response: any;

      const body = {
        data: {
          type: "access-tokens",
          attributes: payload,
        }
      };

      response = await api.post('access-tokens', body, { withCredentials: true });
      if (response.ok) {
        const responseParsed = parseLoginDataResponse(response.data);
        dispatch(saveLoginDataToLocalStorageAction({email: payload.username}));
        saveCustomerUsernameToLocalStorage({email: payload.username});
        saveAccessDataToLocalStorage(responseParsed);
        dispatch(loginCustomerFulfilledStateAction(responseParsed));
        toast.success('You are now logged in');
        return responseParsed;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(loginCustomerRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('loginRequest error', error);
      dispatch(loginCustomerRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
