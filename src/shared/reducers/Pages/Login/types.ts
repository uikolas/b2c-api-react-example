import {
  ICustomerLoginDataParsed,
  ILoginDataToLocalStorage,
  TCustomerEmail,
  TCustomerUsername
} from "src/shared/interfaces/customer/index";
import {IReduxState} from "src/typings/app";

export interface ILoginState extends IReduxState {
  data: ILoginStateData;
}

export type TPageLoginAction = {
  type: string;
  payloadStoreFulfilled?: ILoginDataToLocalStorage;
  payloadRefreshTokenFulfilled?: ICustomerLoginDataParsed;
  payloadAuthFulfilled?: ICustomerLoginDataParsed;
  error?: string;
};

interface ILoginStateData extends ICustomerLoginDataParsed {
  isAuth?: boolean;
  customerUsername: TCustomerUsername | TCustomerEmail;
}

