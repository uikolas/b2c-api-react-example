import api from 'src/services/api/index';
import { REFRESH_TOKEN_REQUEST } from '@stores/actionTypes/pages/login';
import { parseLoginDataResponse } from 'src/helpers/customer/loginDataResponse';
import { saveAccessDataToLocalStorage } from 'src/helpers/localStorage/index';
import { ApiServiceAbstract } from 'src/services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from 'src/services/types';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from 'src/constants/notifications/index';

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
                NotificationsMessage({
                    messageWithCustomText: 'unexpected.error.message',
                    message: error.message,
                    type: typeNotificationError
                });

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
            NotificationsMessage({
                messageWithCustomText: 'request.error.message',
                message: errorMessage,
                type: typeNotificationError
            });

            return Promise.reject(errorMessage);
        }
    }
}
