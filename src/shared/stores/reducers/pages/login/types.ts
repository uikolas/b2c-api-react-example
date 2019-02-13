import {
    ICustomerLoginDataParsed,
    ILoginDataToLocalStorage, IResetPasswordPayload,
    TCustomerEmail,
    TCustomerUsername
} from 'src/shared/interfaces/customer/index';
import { IReduxState } from 'src/typings/app';
import { IActionData } from 'src/shared/stores/reducers/types';

export interface ILoginState extends IReduxState {
    data: ILoginStateData;
}

export interface IPageLoginAction extends IActionData {
    payloadStoreFulfilled?: ILoginDataToLocalStorage;
    payloadRefreshTokenFulfilled?: ICustomerLoginDataParsed;
    payloadAuthFulfilled?: ICustomerLoginDataParsed;
    payloadResetPassword?: IResetPasswordPayload;
    payload: ICustomerLoginDataParsed;
}

interface ILoginStateData extends ICustomerLoginDataParsed {
    isAuth?: boolean;
    customerUsername: TCustomerUsername | TCustomerEmail;
}
