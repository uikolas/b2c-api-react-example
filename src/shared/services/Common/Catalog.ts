import api from '../api';
import { toast } from 'react-toastify';

export class CatalogService {
  public static async catalogSearch(ACTION_TYPE: string, dispatch: Function, params: any): Promise<any> {
    try {

      let response: any;
      response = await api.get('catalog-search', params, {withCredentials: true});

      if (response.ok) {
        const pagination = response.data.data[0].attributes.pagination;
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          items: response.data.data[0].attributes.products,
          filters: response.data.data[0].attributes.valueFacets,
          rangeFilters: response.data.data[0].attributes.rangeFacets,
          sortParams: response.data.data[0].attributes.sort.sortParamNames,
          pagination: {
            numFound: pagination.numFound,
            currentPage: pagination.currentPage,
            maxPage: pagination.maxPage,
            currentItemsPerPage: pagination.currentItemsPerPage,
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

      let response: any;
      response = await api.get('catalog-search-suggestions', {q: query, include: ''}, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          products: response.data.data[0].attributes.products,
          categories: response.data.data[0].attributes.categories,
          searchTerm: query,
          currency: response.data.data[0].attributes.currency || '',
        });
        return response.data;
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

  public static async getCategoriesTree(ACTION_TYPE: string, dispatch: Function): Promise<any> {
    try {

      const response: any = await api.get('category-trees', {}, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          categories: response.data.data[0].attributes.categoryNodesStorage,
        });
        return response.data.data[0];
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
      console.error('Categories catch:', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
