
export interface IProductCardImages {
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
}
