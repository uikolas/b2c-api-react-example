import api from '../api';
import { toast } from 'react-toastify';
import { parseCatalogSearchResponse } from 'src/shared/helpers/catalog/catalogSearchResponse';

export class CatalogService {
  public static async catalogSearch(ACTION_TYPE: string, dispatch: Function, params: any): Promise<any> {
    try {

      params.include = 'abstract-products,product-labels,';

      let response: any;
      response = await api.get('catalog-search', params, {withCredentials: true});

      if (response.ok) {
        const responseParsed = parseCatalogSearchResponse(response.data);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          ...responseParsed,
        });
        return response.data;
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

  public static async catalogSuggestion(ACTION_TYPE: string, dispatch: Function, query: string): Promise<any> {
    try {

      const response: any = await api.get(
        'catalog-search-suggestions',
        {q: query, include: 'abstract-products,abstract-product-prices'},
        {withCredentials: true},
      );

      if (response.ok) {
        const {data}: any = response;

        const products: any[] = data.data[0].attributes.products.slice(0, 4);
        let counter = 0;

        data.included && data.included.some((row: any) => {
          if (row.type === 'abstract-product-prices') {
            const product: any = products.find((prod: any) => prod.abstract_sku === row.id);
            if (product && row.attributes.prices && row.attributes.prices.length) {
              counter++;
              product.prices = row.attributes.prices;
            }
          }

          return counter >= 4;
        });

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          products,
          categories: data.data[0].attributes.categories,
          searchTerm: query,
          currency: data.data[0].attributes.currency || '',
          completion: data.data[0].attributes.completion,
        });
        return products;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Catalog suggestion', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
