import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {RefreshTokenService} from '../Common/RefreshToken';
import {
  ordersCollectionFulfilledStateAction,
  ordersCollectionPendingStateAction,
  ordersCollectionRejectedStateAction
} from "../../actions/Pages/Order";
import {getTestDataPromise} from "../apiFixture/index";
import {orderAuthenticateErrorText} from "../../constants/messages/errors";

export class OrderService {

  // Get collection of orders
  public static async getOrdersCollection(dispatch: Function): Promise<any> {
    try {
      dispatch(ordersCollectionPendingStateAction());

      /*const body = {
        data: {
          type: "carts",
          attributes: payload,
        }
      };*/

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: 'ok',
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        try {
          const token = await RefreshTokenService.getActualToken(dispatch);
          if (!token) {
            throw new Error(orderAuthenticateErrorText);
          }
          setAuthToken(token);
          response = await api.get('orders', null, { withCredentials: true });
        } catch (err) {
          console.error('OrderService: getOrdersCollection: err', err);
        }
      }

      console.log('OrderService: getOrdersCollection: response: ', response);
      if (response.ok) {
        const responseParsed = response.data;
        dispatch(ordersCollectionFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        dispatch(ordersCollectionRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(ordersCollectionRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
