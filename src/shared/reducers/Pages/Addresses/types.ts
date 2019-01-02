import {IReduxState} from "src/typings/app";
import {IAddressItem} from "src/shared/interfaces/addresses/index";


export interface IAddressesState extends IReduxState {
  data: {
    addresses: IAddressItem[],
    currentAddress: IAddressItem | null,
  };
}

export type TPageAddressesAction = {
  type: string;
  addresses?: Array<IAddressItem>;
  addressId?: IAddressItem["id"];
};
