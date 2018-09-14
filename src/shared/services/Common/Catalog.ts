import api from '../api';
import { toast } from 'react-toastify';

export class CatalogService {
  public static async catalogSearch(ACTION_TYPE: string, dispatch: Function, params: any): Promise<any> {
    try {

      const response: any = await api.get('catalog-search', params);
      console.info(response.data.data[0].attributes);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data.data[0].attributes,
        });
        return response.data;
      } else {
        console.error('Catalog search', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Catalog search', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }

  public static async catalogSearchSuggestion(ACTION_TYPE: string, dispatch: Function, query: string): Promise<any> {
    try {

      const response: any = await api.get('catalog-search-suggestions', {q: query}, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          items: response.data.data[0].attributes.products,
          searchTerm: query,
          currency: response.data.data[0].attributes.currency || '',
        });
        return response.data;
      } else {
        console.error('Catalog search', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Catalog search', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
