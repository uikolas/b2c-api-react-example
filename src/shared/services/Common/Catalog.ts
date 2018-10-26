import api from '../api';
import { toast } from 'react-toastify';

export class CatalogService {
  public static async catalogSearch(ACTION_TYPE: string, dispatch: Function, params: any): Promise<any> {
    try {

      let response: any;
      response = await api.get('catalog-search', params, {withCredentials: true});

      if (response.ok) {
        const pagination = response.data.data[0].attributes.pagination;
        const filters: any[] = [];
        let category: any[] = [];
        let currentCategory: string = '';

        response.data.data[0].attributes.valueFacets.forEach((filter: any) => {
          if (filter.name === 'category') {
            category = Array.isArray(filter.values) ? filter.values : [];
            currentCategory = filter.activeValue;
          } else {
            filters.push(filter);
          }
        });

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          items: response.data.data[0].attributes.products,
          filters,
          category,
          currentCategory,
          currentSort: response.data.data[0].attributes.sort.currentSortParam,
          rangeFilters: response.data.data[0].attributes.rangeFacets,
          sortParams: response.data.data[0].attributes.sort.sortParamNames,
          pagination: {
            numFound: pagination.numFound,
            currentPage: pagination.currentPage,
            maxPage: pagination.maxPage,
            currentItemsPerPage: pagination.currentItemsPerPage,
            validItemsPerPageOptions: pagination.config.validItemsPerPageOptions,
          },
          spellingSuggestion: response.data.data[0].attributes.spellingSuggestion,
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
        {withCredentials: true}
      );

      if (response.ok) {
        const {data}: any = response;

        const products: any[] =  data.data[0].attributes.products.slice(0, 4);
        let counter = 0;

        data.included.some((row: any) => {
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
        return data;
      } else {
        console.error('Catalog suggestion', response.problem);
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
