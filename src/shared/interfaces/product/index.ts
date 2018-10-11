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
export type TProductSKU = string;
export type TProductName = string;
export type TProductPrice = number;
export type TProductQuantity = number;
export type TProductCurrency = string;
export type TProductAvailability = boolean;
export type TProductAttributes = object;
export type TProductImageSRC = string;
export type TProductAttributeMap = object;

export const priceTypeNameDefault = 'DEFAULT';
export type TPriceTypeNameDefault = 'DEFAULT';
export const priceTypeNameOriginal = 'ORIGINAL';
export type TPriceTypeNameOriginal = 'ORIGINAL';

export type TPriceTypeName = TPriceTypeNameDefault | TPriceTypeNameOriginal;
export type TPriceTypeOriginalGross = number | null;
export type TPriceTypeOriginalNet = number | null;
export type TPriceTypeDefaultGross = number | null;
export type TPriceTypeDefaultNet = number | null;

// Interfaces
export interface IProductCardPrice {
  priceTypeName?: string;
  grossAmount?: number;
  DEFAULT?: number;
  ORIGINAL?: number;
  [key: string]: any;
}

export interface IProductPricesItem {
  grossAmount: number | null;
  netAmount: number | null;
  priceTypeName: TPriceTypeName;
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
  prices?: Array<IProductCardPrice>;
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
  priceOriginalGross: TPriceTypeOriginalGross;
  priceOriginalNet: TPriceTypeOriginalNet;
  priceDefaultGross: TPriceTypeDefaultGross;
  priceDefaultNet: TPriceTypeDefaultNet;
  sku: TProductSKU | null;
  productType: TProductType | null;
}

export interface IProductDataParsed {
  attributeMap: IProductAttributeMap | null;
  superAttributes: Array<ISuperAttribute> | null;
  abstractProduct: IProductPropFullData | null;
  concreteProducts: {
    [key: string]: IProductPropFullData
  };
}
