import {IProductCardPrice, IProductAttributes} from '../product';

export interface IWishlistItem {
  sku: string,
  name: string,
  image: string,
  attributes: Array<IProductAttributes>,
  prices: Array<IProductCardPrice>,
  availability: boolean,
}

export interface IWishlist {
  id: string,
  name: string,
  numberOfItems: number | null,
  createdAt: string,
  updatedAt: string,
}
