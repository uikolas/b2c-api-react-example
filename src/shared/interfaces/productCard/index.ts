
/*export interface IProductCardImages {
  externalUrlSmall: string;
  externalUrlLarge: string;
}

export interface IProductCardPrice {
  priceTypeName: string;
  grossAmount: number;
  DEFAULT?: number;
  ORIGINAL?: number;
}

export interface IProductCard {
  images: Array<IProductCardImages>;
  price: number;
  prices?: Array<IProductCardPrice>;
  abstractName: string;
  abstractSku: string;
}*/

export interface IProductCardImages {
  external_url_small: string;
  external_url_large: string;
}

export interface IProductCard {
  images: Array<IProductCardImages>;
  price: number;
  abstract_name: string;
  abstract_sku: string;
}
