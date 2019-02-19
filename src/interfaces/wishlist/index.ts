import { IProductAttributes, IProductPricesItem } from '../product/index';

export type TWishlistName = string;
export type TWishlistId = string;

export interface IWishlistProduct {
    sku: string;
    name: string;
    image: string;
    attributes: IProductAttributes[];
    prices: IProductPricesItem[];
    availability: boolean;
}

export interface IWishlist {
    id: TWishlistId;
    name: TWishlistName;
    numberOfItems: number;
    createdAt: string;
    updatedAt: string;
}
