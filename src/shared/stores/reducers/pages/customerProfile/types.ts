import { IReduxState } from 'src/typings/app';
import { ICustomerDataParsed } from '@interfaces/customer';
import {IActionData} from "src/shared/stores/reducers/types";

export interface ICustomerDataState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null,
    isPasswordUpdated: boolean | null;
  };
}

export interface IPageCustomerProfileAction extends IActionData {
  payloadProfileFulfilled?: ICustomerDataParsed;
}
