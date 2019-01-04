import {IAddressItem} from "src/shared/interfaces/addresses/index";

export interface IAddressRawResponse {
  data: Array<IAddressDataRawResponse>;
}

export interface IAddressDataRawResponse {
  attributes: IAddressItem;
  id: string;
  links: {
    self: string;
  };
  type: string;
}

export interface IRequestAddAddressBody {
  data: {
    type: string;
    attributes: IAddressItem;
    include?: string;
  };
}

export interface IRequestUpdateAddressBody {
  data: {
    type: string;
    id: string,
    attributes: IAddressItem;
    include?: string;
  };
}
