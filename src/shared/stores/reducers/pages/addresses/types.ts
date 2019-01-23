import {IReduxState} from "src/typings/app";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {IActionData} from "src/shared/stores/reducers/types";


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

export interface IPageAddressesAction extends IActionData {
  addresses?: Array<IAddressItem>;
  address?: IAddressItem;
  addressId?: IAddressItem["id"];
  payloadFulfilled?: IPageAddressesActionPayloadFulfilled;
}
