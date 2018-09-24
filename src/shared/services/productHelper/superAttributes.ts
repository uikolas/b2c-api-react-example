
import {IProductSuperAttributes} from "../../interfaces/product/index";

interface ISuperAttributeData {
  value: string;
  name: string;
  idProductConcrete: string | number;
}

interface ISuperAttribute {
  name: string;
  nameToShow: string;
  data: Array<ISuperAttributeData>;
}

export const parseSuperAttributes = (superAttributes: IProductSuperAttributes) => {
  if(!superAttributes.super_attributes || typeof superAttributes.super_attributes !== 'object'){
    return false;
  }

  const names = Object.keys(superAttributes.super_attributes);
  const superData: Array<ISuperAttribute> = [];

  names.forEach((name) => {
    const data: Array<ISuperAttributeData> = [];

    const values = superAttributes.super_attributes[name];

    values.forEach((value: string) => {
      data.push(
        {
          value,
          name: value,
          idProductConcrete: superAttributes.attribute_variants[`${name}:${value}`].id_product_concrete
        }
      );
    });

    superData.push({ name, nameToShow: name, data });
  });

  return superData;
};
