
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
  external_url_small?: string;
  external_url_large?: string;
  externalUrlLarge?: string;
  externalUrlSmall?: string;
}

export interface IProductCard {
  images?: Array<IProductCardImages>;
  price?: number;
  abstract_name?: string;
  abstract_sku?: string;
}

export interface IProductSuperAttributes {
  attribute_variants: any;
  product_concrete_ids: Array<string>;
  super_attributes: any;
}

export interface IProductPropFullData {
  attributes: object;
  availability: boolean;
  availableQuantity: number;
  description: string;
  images: Array<IProductCardImages>;
  name: string;
  price: number;
  sku: string;
  superAttributes: IProductSuperAttributes;
}
