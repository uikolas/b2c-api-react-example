import api from '../api';
import { toast } from 'react-toastify';

import { REFRESH_TOKEN_REQUEST } from '../../constants/ActionTypes/Pages/Login';

export class RefreshTokenService {
  public static async getActualToken(dispatch: Function): Promise<any> {
    const accessToken: string = localStorage.getItem('accessToken');
    const tokenExpire: string = localStorage.getItem('tokenExpire');
    const refreshToken: string = localStorage.getItem('refreshToken');

    if (!accessToken || !tokenExpire || !refreshToken) {
      return Promise.reject();
    }

    const now: number = Math.floor(Date.now() / 1000);

    if (now > +tokenExpire) {
      try {
        const newToken = await RefreshTokenService.refreshTokenRequest(dispatch, refreshToken)
        return newToken;
      } catch (error) {
        console.error('Refresh token', error);
        dispatch({
          type: REFRESH_TOKEN_REQUEST + '_REJECTED',
          error,
        });
        toast.error('Unexpected error: ' + error);
        return Promise.reject();
      }
    }

    return accessToken;
  }

  public static async refreshTokenRequest(dispatch: Function, refreshToken: string): Promise<any> {
    const body = {
      data: {
        type: "refresh-tokens",
        attributes: {refreshToken},
      }
    };

    dispatch({ type: REFRESH_TOKEN_REQUEST + '_PENDING' });

    const response: any = await api.post('refresh-tokens', body, { withCredentials: true });

    if (response.ok) {
      dispatch({
        type: REFRESH_TOKEN_REQUEST + '_FULFILLED',
        payload: response.data.data.attributes,
      });

      return response.data.data.attributes.refreshToken;
    } else {
      console.error('Refresh token', response.problem);
      dispatch({
        type: REFRESH_TOKEN_REQUEST + '_REJECTED',
        error: response.problem,
      });
      toast.error('Request Error: ' + response.problem);
      return Promise.reject();
    }
  }
}
