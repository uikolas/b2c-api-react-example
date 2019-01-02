import {
  IProductAttributesRawResponse,
  IProductAvailability,
  IProductPricesItem,
  TProductImageSetsCollectionRawResponse,
} from "src/shared/interfaces/product/index";

export interface IProductRawResponse {
  data: {
    attributes: IProductAttributesRawResponse;
  };
  links: {
    self: string;
  };
  type: string;
  included: Array<TRowProductResponseIncluded>;
}

export type TRowProductResponseIncluded = IRowProductPricesIncludedResponse
  | IRowProductImageSetsIncludedResponse
  | IRowProductAvailabilitiesIncludedResponse
  | IRowConcreteProductsIncludedResponse;

export interface IProductAvailabilitiesRawResponse {
  data: [{
    attributes: IProductAvailability;
    id: string;
  }];
  links: {
    self: string;
  };
  type: string;
}

export interface ISuperAttribute {
  name: string;
  nameToShow: string;
  data: Array<ISuperAttributeData>;
}

export interface ISuperAttributeData {
  value: string;
  name: string;
  idProductConcrete?: string | number;
}

export interface IAbstractRowProductIncludedResponse {
  type: string;
  links: {
    self: string;
  };
  id?: string;
}

export interface IRowProductPricesIncludedResponse extends IAbstractRowProductIncludedResponse {
  type: "abstract-product-prices" | "concrete-product-prices";
  attributes: {
    price: number;
    prices: Array<IProductPricesItem>;
  };
}

export interface IRowProductImageSetsIncludedResponse extends IAbstractRowProductIncludedResponse {
  type: "abstract-product-image-sets" | "concrete-product-image-sets";
  attributes: {
    imageSets: TProductImageSetsCollectionRawResponse;
  };
}

export interface IRowProductAvailabilitiesIncludedResponse extends IAbstractRowProductIncludedResponse {
  type: "abstract-product-availabilities" | "concrete-product-availabilities";
  attributes: IProductAvailability;
}

export interface IRowConcreteProductsIncludedResponse extends IAbstractRowProductIncludedResponse {
  type: "concrete-products";
  attributes: IProductAttributesRawResponse;
}
