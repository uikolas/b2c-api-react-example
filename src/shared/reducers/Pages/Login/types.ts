import {
  ICustomerLoginDataParsed,
  ILoginDataToLocalStorage,
  TCustomerEmail,
  TCustomerUsername
} from "src/shared/interfaces/customer/index";
import {IReduxState} from "src/typings/app";
import {IActionData} from "src/shared/reducers/types";

export interface ILoginState extends IReduxState {
  data: ILoginStateData;
}

export interface IPageLoginAction extends IActionData {
  payloadStoreFulfilled?: ILoginDataToLocalStorage;
  payloadRefreshTokenFulfilled?: ICustomerLoginDataParsed;
  payloadAuthFulfilled?: ICustomerLoginDataParsed;
}

interface ILoginStateData extends ICustomerLoginDataParsed {
  isAuth?: boolean;
  customerUsername: TCustomerUsername | TCustomerEmail;
}

