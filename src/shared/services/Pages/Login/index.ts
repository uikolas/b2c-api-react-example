import { toast } from 'react-toastify';
import api from 'src/shared/services/api';
import { saveLoginDataToStoreAction } from '@stores/actions/pages/customerProfile';
import { parseLoginDataResponse } from 'src/shared/helpers/customer';
import {
    loginCustomerFulfilledStateAction,
    loginCustomerPendingStateAction,
    loginCustomerRejectedStateAction,
} from '@stores/actions/pages/login';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import { ICustomerLoginData, ICustomerProfile, IResetPasswordPayload } from 'src/shared/interfaces/customer';
import { saveAccessDataToLocalStorage, saveCustomerUsernameToLocalStorage } from 'src/shared/helpers/localStorage';
import { IApiResponseData } from "src/shared/services/types";
import { FormattedMessageTemplate } from 'src/shared/lib/formatted-message-template';

export class PagesLoginService extends ApiServiceAbstract {
    public static async register(ACTION_TYPE: string, dispatch: Function, payload: ICustomerProfile): Promise<void> {
        try {
            const body = {
                data: {
                    type: 'customers',
                    attributes: payload,
                },
            };
            const response: IApiResponseData = await api.post('customers', body, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });

                toast.success(FormattedMessageTemplate('register.success.message'));

                await PagesLoginService.loginRequest(dispatch, {
                    username: payload.email,
                    password: payload.password,
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: { error: errorMessage },
                });

                if (response.status === 422) {
                    toast.warn(errorMessage);
                } else {
                    toast.error(errorMessage);
                }
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: { error: error.message },
            });
            toast.error('Unexpected Error: ' + error.message);
        }
    }

    public static async loginRequest(dispatch: Function, payload: ICustomerLoginData): Promise<void> {
        try {
            dispatch(loginCustomerPendingStateAction());

            const body = {
                data: {
                    type: 'access-tokens',
                    attributes: payload,
                },
            };

            const response: IApiResponseData = await api.post('access-tokens', body, { withCredentials: true });

            if (response.ok) {
                const responseParsed = parseLoginDataResponse(response.data);
                dispatch(saveLoginDataToStoreAction({ email: payload.username }));
                saveAccessDataToLocalStorage(responseParsed);
                dispatch(loginCustomerFulfilledStateAction(responseParsed));
                toast.success(FormattedMessageTemplate('customer.login.message'));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginCustomerRejectedStateAction(errorMessage));
                toast.error(errorMessage);
            }

        } catch (error) {
            dispatch(loginCustomerRejectedStateAction(error.message));
            toast.error('Unexpected Error: ' + error);
        }
    }

    public static async forgotPassword(ACTION_TYPE: string, dispatch: Function, email: string): Promise<void> {
        try {
            const body = {
                data: {
                    type: 'customer-forgotten-password',
                    attributes: { email },
                },
            };

            const response: IApiResponseData = await api.post('customer-forgotten-password', body, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });
                toast.success('Link for restore password sended to your Email.');
            } else {
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: { error: response.problem },
                });
                toast.error(response.problem);
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: { error: error.message },
            });
            toast.error('Unexpected Error: ' + error.message);
        }
    }

    public static async resetPassword(ACTION_TYPE: string,
                                      dispatch: Function,
                                      payload: IResetPasswordPayload): Promise<void> {
        try {
            const body = {
                data: {
                    type: 'customer-restore-password',
                    attributes: payload,
                },
            };

            const response: IApiResponseData = await api.patch('customer-restore-password', body, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });
                toast.success('Password updated successfull.');
            } else {
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: { error: response.problem },
                });
                toast.error('Request Error: ' + response.problem);
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: { error: error.message },
            });
            toast.error('Unexpected Error: ' + error.message);
        }
    }
}
