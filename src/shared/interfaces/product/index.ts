import {ISuperAttribute} from "../../services/productHelper/superAttributes";

// Constants
export const concreteProductType = 'concreteProduct';
export type TConcreteProductType = 'concreteProduct';

export const abstractProductType = 'abstractProduct';
export type TAbstractProductType = 'abstractProduct';

export const absentProductType = 'absentProduct';
export type TAbsentProductType = 'absentProduct';

export const defaultItemValueDropdown = " ";

// Types
export type TProductType = TAbstractProductType | TConcreteProductType | TAbsentProductType;
export type TProductDescription = string;
export type TProductSKU = string | number;
export type TProductName = string;
export type TProductPrice = number;
export type TProductQuantity = number;
export type TProductCurrency = string;
export type TProductAvailability = boolean;
export type TProductAttributes = object;

// Interfaces
export interface IProductCardPrice {
  priceTypeName?: string;
  grossAmount?: number;
  DEFAULT?: number;
  ORIGINAL?: number;
  [key: string]: any;
}

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
  abstractName?: string;
  abstract_sku?: string;
  abstractSku?: string;
  prices?: Array<IProductCardPrice>
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

export interface IProductPropFullData {
  attributes: TProductAttributes | null;
  availability: TProductAvailability | null;
  quantity: TProductQuantity | null;
  description: TProductDescription | null;
  images: Array<IProductCardImages> | null;
  name: TProductName | null;
  price: TProductPrice | null;
  sku: TProductSKU | null;
  productType: TProductType | null;
}
