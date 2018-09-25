import api from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {fixtureFull} from './productFixtureWithSuperAttr';
import {
  parseSuperAttributes,
  getAvailabilityDisplay,
  parseImageSets,
} from "../productHelper";

export class ProductService {
  public static async getAbstractData(ACTION_TYPE: string, dispatch: Function, sku: string): Promise<any> {
    try {

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        response = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: fixtureFull,
        };
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.get(`abstract-products/${sku}`);
      }
      if (response.ok) {
        const { data, data: {attributes}, included }: any = response.data;

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

        /*included.forEach((data: any) => {
          switch (data.type) {
            case 'abstract-product-image-sets':
              result.abstractProduct.images = parseImageSets(data.attributes.imageSets);
              data.attributes.imageSets.map((set: any) => {
                set.images.forEach((imgs: any) => {
                  result.images.push(imgs);
                });
              });
              break;
            case 'abstract-product-prices':
              result.abstractProduct.price = data.attributes.price;
              result.abstractProduct.prices = data.attributes.prices;
              break;
            case 'abstract-product-availabilities':
              result.abstractProduct.availability = getAvailabilityDisplay(data.attributes.availability);
              result.abstractProduct.quantity = data.attributes.quantity;
              break;
            default:
              break;
          }
        });
*/
        console.log('!!!! result: ', result);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: result,
        });
        return result;
      } else {
        // console.error('Catalog search', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Catalog catch search', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
