import { IReduxState } from 'src/typings/app';
import { ICustomerDataParsed } from '@interfaces/customer';

export interface ICustomerDataState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null,
    isPasswordUpdated: boolean | null;
  };
}
