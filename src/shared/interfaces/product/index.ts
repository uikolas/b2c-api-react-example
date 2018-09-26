import {ISuperAttribute} from "../../services/productHelper/superAttributes";

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

export interface IProductAttributeMap {
  attribute_variants: any;
  product_concrete_ids: any;
  super_attributes: any;
}

export interface IProductAttributes {
  [key: string]: string | number;
}

export interface ISuperAttributes {
  superAttributes: Array<ISuperAttribute> | null;
}

export type TCurrentProductType = 'abstractProduct' | 'concreteProduct' | 'absentProduct';

export interface IProductPropFullData {
  attributes: object;
  availability: boolean | null;
  quantity: number | null;
  description: string | null;
  images: Array<IProductCardImages> | null;
  name: string | null;
  price: number | null;
  sku: string | null;
  productType: TCurrentProductType | null;
}
