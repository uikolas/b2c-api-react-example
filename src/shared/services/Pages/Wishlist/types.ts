import { IWishlist } from 'src/shared/interfaces/wishlist';
import {
    IRowConcreteProductsIncludedResponse,
    IRowProductAvailabilitiesIncludedResponse,
    IRowProductImageSetsIncludedResponse,
    IRowProductPricesIncludedResponse
} from 'src/shared/helpers/product/types';

export interface IWishlistRawResponse {
    data: IWishlistRawData[];
    id: string;
    included?: TRowWishlistIncludedResponse[];
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
