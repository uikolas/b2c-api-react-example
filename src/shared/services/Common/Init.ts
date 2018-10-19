import api from '../api';
import { toast } from 'react-toastify';
import { API_WITH_FIXTURES } from '../../constants/Environment';
import { getTestDataPromise } from '../fixtures/apiFixture';
import {
  IInitApplicationDataPayload,
  initApplicationDataFulfilledStateAction,
  initApplicationDataPendingStateAction,
  initApplicationDataRejectedStateAction,
} from '../../actions/Common/Init';
import { initFixture } from '../fixtures/initFixture';
import { parseStoreResponse } from '../../helpers/init/store';

export class InitAppService {

  public static async getInitData(dispatch: Function, payload?: IInitApplicationDataPayload): Promise<any> {
    try {
      let response: any;
      dispatch(initApplicationDataPendingStateAction());

      // TODO: this is only for development reasons - remove after finish
      if (API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: initFixture,
        };
        response = await getTestDataPromise(result);
        console.info('+++API_WITH_FIXTURES response: ', response);
      } else {
        response = await api.get('stores', null);
      }

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
