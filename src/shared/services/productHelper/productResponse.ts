import {
  parseSuperAttributes,
  parseImageSets,
  getAvailabilityDisplay,
} from "./index";

interface IResponse {
  data: object;
  included: object;
}

export const parseProductResponse = (response: IResponse): any => {
  if (!response) {
    return false;
  }
  const { data, included }: any = response;

  const result: any = {
    attributeMap: data.attributes.attributeMap,
    superAttributes: parseSuperAttributes(data.attributes.attributeMap),
    abstractProduct: {
      sku: data.attributes.sku,
      name: data.attributes.name,
      description: data.attributes.description,
      attributes: data.attributes.attributes,
      images: [],
      price: null,
      availability: null,
      quantity: null,
    },
    concreteProducts: {

    },
  };

  // Fill data with concrete products ids
  if (data.attributes.attributeMap.product_concrete_ids) {
    data.attributes.attributeMap.product_concrete_ids.forEach((id: any) => {
      result.concreteProducts[id] = {};
    });
  }

  included.forEach((row: any) => {

    // Abstract part start
    if (row.type === 'abstract-product-image-sets') {
      result.abstractProduct.images = parseImageSets(row.attributes.imageSets);
    } else if (row.type === 'abstract-product-prices') {
      result.abstractProduct.price = row.attributes.price;
      result.abstractProduct.prices = row.attributes.prices;
    } else if (row.type === 'abstract-product-availabilities') {
      result.abstractProduct.availability = getAvailabilityDisplay(row.attributes.availability);
      result.abstractProduct.quantity = row.attributes.quantity;
      // Abstract part end

      // Concrete part start
    } else if (row.type === 'concrete-products' && !result.concreteProducts[row.id].name) {
      result.concreteProducts[row.id].name = row.attributes.name;
      result.concreteProducts[row.id].sku = row.attributes.sku;
      result.concreteProducts[row.id].description = row.attributes.description;
      result.concreteProducts[row.id].attributes = row.attributes.attributes;
    } else if (row.type === 'concrete-product-image-sets' && !result.concreteProducts[row.id].images) {
      result.concreteProducts[row.id].images = parseImageSets(row.attributes.imageSets);
    } else if (row.type === 'concrete-product-prices' && !result.concreteProducts[row.id].price) {
      result.concreteProducts[row.id].price =  row.attributes.price;
      result.concreteProducts[row.id].prices =  row.attributes.prices;
    } else if (row.type === 'concrete-product-availabilities' && !result.concreteProducts[row.id].availability) {
      result.concreteProducts[row.id].availability =  row.attributes.availability;
      result.concreteProducts[row.id].quantity =  row.attributes.quantity;
    }
    // Concrete part end
  });

  return result;
};
