import api from '../api';
import { toast } from 'react-toastify';
import {number, object} from 'prop-types';

export class ProductService {
  public static async getAbstractData(ACTION_TYPE: string, dispatch: Function, sku: string): Promise<any> {
    try {

      const response: any = await api.get(`abstract-products/${sku}`);

      if (response.ok) {
        const { data: {attributes}, included }: any = response.data;

        const result: any = {
          sku,
          name: attributes.name,
          description: attributes.description,
          attributes: attributes.attributes,
          superAttributes: attributes.attributeMap, // 135 attribute_variants[], super_attributes[],
          images: [],
          price: 0,
        };

        included.forEach((data: any) => {
          switch (data.type) {
            case 'abstract-product-image-sets':
              result.images = [];
              data.attributes.imageSets.map((set: any) => {
                set.images.forEach((imgs: any) => {
                  result.images.push(imgs);
                })
              });
              break;
            case 'abstract-product-prices':
              result.price = data.attributes.price;
              break;
            default:
              break;
          }
        });

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
