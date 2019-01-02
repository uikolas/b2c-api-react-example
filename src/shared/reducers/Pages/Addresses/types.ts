import {IReduxState} from "src/typings/app";
import {IAddressItem} from "src/shared/interfaces/addresses/index";


export interface IAddressesState extends IReduxState {
  data: {
    addresses: IAddressItem[],
    currentAddress: IAddressItem | null,
  };
}

export interface IPageAddressesActionPayloadFulfilled {
  addressId: IAddressItem["id"];
  data: IAddressItem;
}

export type TPageAddressesAction = {
  type: string;
  addresses?: Array<IAddressItem>;
  address?: IAddressItem;
  addressId?: IAddressItem["id"];
  payloadFulfilled?: IPageAddressesActionPayloadFulfilled;
  error?: string;
};
