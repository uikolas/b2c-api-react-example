import api from '../api';
import { toast } from 'react-toastify';
import {
  IInitApplicationDataPayload,
  initApplicationDataFulfilledStateAction,
  initApplicationDataPendingStateAction,
  initApplicationDataRejectedStateAction,
  categoriesPendingState,
  categoriesRejectedState,
  categoriesFulfilledState,
  getCategoriesAction,
} from '../../actions/Common/Init';
import { parseStoreResponse } from '../../helpers/init/store';

export class InitAppService {

  public static async getInitData(dispatch: Function, payload?: IInitApplicationDataPayload): Promise<any> {
    let anonymId: string;
    try {
      const nodeResponse: any = await api.get('react/getUniqueUser');
      anonymId = nodeResponse.data;
    } catch (err) {
      anonymId = 'anonym';
    }

    try {
      let response: any;
      dispatch(initApplicationDataPendingStateAction());
      response = await api.get('stores', null);

      if (response.ok) {
        const responseParsed = parseStoreResponse(response.data);
        dispatch(initApplicationDataFulfilledStateAction({...responseParsed, anonymId}));

        dispatch(getCategoriesAction());
        return response.data;
      } else {
        dispatch(initApplicationDataRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(initApplicationDataRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async getCategoriesTree(dispatch: Function): Promise<any> {
    try {
      dispatch(categoriesPendingState());
      const response: any = await api.get('category-trees', {}, {withCredentials: true});

      if (response.ok) {
        let tree = response.data.data[0].attributes.categoryNodesStorage;

        if (!Array.isArray(tree)) {
          tree = [];
        }
        dispatch(categoriesFulfilledState(tree));
        return response.data.data[0];
      } else {
        dispatch(categoriesRejectedState(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('Categories catch:', error);
      dispatch(categoriesRejectedState(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
