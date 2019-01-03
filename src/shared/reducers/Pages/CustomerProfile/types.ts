import { IReduxState } from 'src/typings/app';
import { ICustomerDataParsed } from 'src/shared/interfaces/customer';
import {IActionData} from "src/shared/reducers/types";

export interface ICustomerDataState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null,
    isPasswordUpdated: boolean | null;
  };
}

export interface IPageCustomerProfileAction extends IActionData {
  payloadProfileFulfilled?: ICustomerDataParsed;
}
