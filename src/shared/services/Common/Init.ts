import api from '../api';
import { toast } from 'react-toastify';
import {
  API_WITH_FIXTURES,
  PRICE_MODE_DEFAULT,
  CURRENCY_DEFAULT,
  STORE_DEFAULT,
} from '../../constants/Environment';
import {getTestDataPromise} from "../apiFixture/index";
import {
  IInitApplicationDataPayload,
  initApplicationDataFulfilledStateAction,
  initApplicationDataPendingStateAction,
  initApplicationDataRejectedStateAction
} from "../../actions/Common/Init";

export class InitAppService {

  public static async getInitData(dispatch: Function, payload?: IInitApplicationDataPayload): Promise<any> {
    try {
      let response: any;
      dispatch(initApplicationDataPendingStateAction());

      // TODO: this is only for development reasons - remove after finish
      const result = {
        ok: true,
        problem: 'Test API_WITH_FIXTURES',
        data: {
          priceMode: PRICE_MODE_DEFAULT,
          currency: CURRENCY_DEFAULT,
          store: STORE_DEFAULT,
        },
      };
      // response = await getTestDataPromise(result);
      response = await api.get('stores', null);
      console.log('getInitData response: ', response);

      if (response.ok) {
        dispatch(initApplicationDataFulfilledStateAction(response.data));
        toast.success('Init data was set');
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
