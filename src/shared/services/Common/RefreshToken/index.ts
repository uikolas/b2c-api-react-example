import api from 'src/shared/services/api';
import { toast } from 'react-toastify';

import { REFRESH_TOKEN_REQUEST } from '@stores/actionTypes/pages/login';
import { parseLoginDataResponse } from 'src/shared/helpers/customer/loginDataResponse';
import { saveAccessDataToLocalStorage } from 'src/shared/helpers/localStorage';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import {IApiResponseData} from "src/shared/services/types";


export class RefreshTokenService extends ApiServiceAbstract {
  public static async getActualToken(dispatch: Function): Promise<string> {
    const accessToken: string = localStorage.getItem('accessToken');
    const tokenExpire: string = localStorage.getItem('tokenExpire');
    const refreshToken: string = localStorage.getItem('refreshToken');

    if (!accessToken || !tokenExpire || !refreshToken) {
      return Promise.reject('Not tokens.');
    }

    const now: number = Math.floor(Date.now() / 1000);

    if (now > +tokenExpire) {
      try {
        const newToken = await RefreshTokenService.refreshTokenRequest(dispatch, refreshToken);
        return newToken;
      } catch (error) {
        dispatch({
          type: REFRESH_TOKEN_REQUEST + '_REJECTED',
          error: error.message,
        });
        toast.error('Unexpected error: ' + error.message);
        return Promise.reject(error.message);
      }
    }

    return accessToken;
  }

  public static async refreshTokenRequest(dispatch: Function, refreshToken: string): Promise<string> {

    const refresh_token = refreshToken;
    const body = {
      data: {
        type: 'refresh-tokens',
        attributes: {
          'refreshToken': refreshToken,
          'refresh_token': refresh_token,
        },
      },
    };

    dispatch({type: REFRESH_TOKEN_REQUEST + '_PENDING'});

    const response: IApiResponseData = await api.post('refresh-tokens', body, {withCredentials: true});

    if (response.ok) {
      const responseParsed = parseLoginDataResponse(response.data);
      saveAccessDataToLocalStorage(responseParsed);
      dispatch({
        type: REFRESH_TOKEN_REQUEST + '_FULFILLED',
        payloadRefreshTokenFulfilled: responseParsed,
      });

      return responseParsed.accessToken;
    } else {
      const errorMessage = this.getParsedAPIError(response);
      dispatch({
        type: REFRESH_TOKEN_REQUEST + '_REJECTED',
        error: errorMessage,
      });
      toast.error('Request Error: ' + errorMessage);
      return Promise.reject(errorMessage);
    }
  }
}
