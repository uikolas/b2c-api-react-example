import api from '../api';
import { toast } from 'react-toastify';
import {
  IInitApplicationDataPayload,
  initApplicationDataFulfilledStateAction,
  initApplicationDataPendingStateAction,
  initApplicationDataRejectedStateAction,
} from '../../actions/Common/Init';
import { parseStoreResponse } from '../../helpers/init/store';

export class InitAppService {

  public static async getInitData(dispatch: Function, payload?: IInitApplicationDataPayload): Promise<any> {
    try {
      let response: any;
      dispatch(initApplicationDataPendingStateAction());
      response = await api.get('stores', null);

      if (response.ok) {
        const responseParsed = parseStoreResponse(response.data);
        dispatch(initApplicationDataFulfilledStateAction(responseParsed));
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
}
