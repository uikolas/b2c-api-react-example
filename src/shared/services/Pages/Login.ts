import { toast } from 'react-toastify';
import api from '../api';
import { saveLoginDataToStoreAction } from 'src/shared/actions/Pages/CustomerProfile';
import { parseLoginDataResponse } from 'src/shared/helpers/customer';
import {
  loginCustomerFulfilledStateAction,
  loginCustomerPendingStateAction,
  loginCustomerRejectedStateAction,
} from 'src/shared/actions/Pages/Login';
import { ApiServiceAbstract } from '../apiAbstractions/ApiServiceAbstract';
import { ICustomerLoginData } from 'src/shared/interfaces/customer';
import { saveAccessDataToLocalStorage, saveCustomerUsernameToLocalStorage } from 'src/shared/helpers/localStorage';

export class PagesLoginService extends ApiServiceAbstract {
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
        });

        toast.success('You have successfully registered');

        return PagesLoginService.loginRequest(dispatch, {
          username: payload.email,
          password: payload.password,
        });
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
          type: 'access-tokens',
          attributes: payload,
        },
      };

      response = await api.post('access-tokens', body, {withCredentials: true});
      if (response.ok) {
        const responseParsed = parseLoginDataResponse(response.data);
        dispatch(saveLoginDataToStoreAction({email: payload.username}));

        // TODO: it's a temporary solution. We do not have email in the /customers/{customerReference}
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

  public static async forgotPassword(ACTION_TYPE: string, dispatch: Function, email: string): Promise<any> {
    try {
      const body = {
        data: {
          type: 'customer-forgotten-password',
          attributes: {email},
        },
      };

      const response: any = await api.post('customer-forgotten-password', body, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
        });
        toast.success('Link for restore password sended to your Email.');
        return response.ok;
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

  public static async resetPassword(ACTION_TYPE: string, dispatch: Function, payload: any): Promise<any> {
    try {
      const body = {
        data: {
          type: 'customer-restore-password',
          attributes: payload,
        },
      };

      const response: any = await api.patch('customer-restore-password', body, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
        });
        toast.success('Password updated successfull.');
        return response.ok;
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
