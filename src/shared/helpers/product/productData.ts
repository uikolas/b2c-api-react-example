import {absentProductType, IProductPropFullData} from "src/shared/interfaces/product/index";

export const getCurrentProductDataObject = (abstractProduct: IProductPropFullData,
                                            concreteProduct: IProductPropFullData | null, ): IProductPropFullData => {
  return {
    sku: concreteProduct ? concreteProduct.sku : null,
    name: concreteProduct ? concreteProduct.name : abstractProduct.name,
    images: concreteProduct
      ? (concreteProduct.images && concreteProduct.images.length ? [...concreteProduct.images] : null)
      : (abstractProduct.images.length ? [...abstractProduct.images] : null),
    availability: concreteProduct ? concreteProduct.availability : false,
    description: concreteProduct ? concreteProduct.description : abstractProduct.description,
    price: concreteProduct ? concreteProduct.price : null,
    prices: concreteProduct ? concreteProduct.prices : null,
    priceOriginalGross: concreteProduct ? concreteProduct.priceOriginalGross : null,
    priceOriginalNet: concreteProduct ? concreteProduct.priceOriginalNet : null,
    priceDefaultGross: concreteProduct ? concreteProduct.priceDefaultGross : null,
    priceDefaultNet: concreteProduct ? concreteProduct.priceDefaultNet : null,
    attributes: concreteProduct ? concreteProduct.attributes : abstractProduct.attributes,
    attributeNames: concreteProduct ? concreteProduct.attributeNames : abstractProduct.attributeNames,
    quantity: concreteProduct ? concreteProduct.quantity : abstractProduct.quantity,
    productType: concreteProduct ? concreteProduct.productType : absentProductType,
  };
};
