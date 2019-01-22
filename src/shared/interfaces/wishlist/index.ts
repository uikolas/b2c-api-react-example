import { IProductAttributes, IProductPricesItem } from '../product';

export type TWishListName = string;
export type TWishListId = string;

export interface IWishlistProduct {
    sku: string;
    name: string;
    image: string;
    attributes: Array<IProductAttributes>;
    prices: Array<IProductPricesItem>;
    availability: boolean;
}

export interface IWishlist {
    id: TWishListId;
    name: TWishListName;
    numberOfItems: number;
    createdAt: string;
    updatedAt: string;
}
