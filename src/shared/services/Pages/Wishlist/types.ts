import {IWishlist} from "src/shared/interfaces/wishlist/index";
import {
  IRowConcreteProductsIncludedResponse,
  IRowProductAvailabilitiesIncludedResponse,
  IRowProductImageSetsIncludedResponse,
  IRowProductPricesIncludedResponse
} from "src/shared/helpers/product/types";

export interface IWishlistRawResponse {
  data: Array<IWishlistRawData>;
  id: string;
  included?: Array<TRowWishlistIncludedResponse>;
}

export interface IWishlistRawData {
  attributes: IWishlist;
  id: string;
  links: {
    self: string;
  };
  type: string;
}

export type TRowWishlistIncludedResponse = IRowProductImageSetsIncludedResponse
  | IRowProductAvailabilitiesIncludedResponse
  | IRowProductPricesIncludedResponse
  | IRowConcreteProductsIncludedResponse;
