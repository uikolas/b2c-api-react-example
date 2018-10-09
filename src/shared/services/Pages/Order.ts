import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {RefreshTokenService} from '../Common/RefreshToken';
import {
  orderDetailsFulfilledStateAction,
  orderDetailsPendingStateAction, orderDetailsRejectedStateAction,
  ordersCollectionFulfilledStateAction,
  ordersCollectionPendingStateAction,
  ordersCollectionRejectedStateAction
} from "../../actions/Pages/Order";
import {getTestDataPromise} from "../apiFixture/index";
import {orderAuthenticateErrorText} from "../../constants/messages/errors";
import {orderHistoryFixtureEmpty, orderHistoryFixtureFull} from "../fixtures/OrderHistoryFixture";
import {parseGetOrdersCollectionResponse} from "../orderHelper/response";
import {orderDetailsFixtureFull} from "../fixtures/orderDetailsFixture";
import {TOrderId} from "../../interfaces/order/index";

export class OrderService {

  // Get collection of orders
  public static async getOrdersCollection(dispatch: Function): Promise<any> {
    try {
      dispatch(ordersCollectionPendingStateAction());

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: orderHistoryFixtureFull,
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
        const responseParsed = parseGetOrdersCollectionResponse(response.data);
        dispatch(ordersCollectionFulfilledStateAction(responseParsed));
        return responseParsed;
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

  // Get order by reference
  public static async getOrderDetails(dispatch: Function, orderId: TOrderId): Promise<any> {
    try {
      dispatch(orderDetailsPendingStateAction());
      const body = {
        data: {
          type: "carts",
        }
      };

      let response: any;
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: orderDetailsFixtureFull,
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
          const endpoint = `orders/${orderId}`;
          response = await api.get(endpoint, body, { withCredentials: true });
        } catch (err) {
          console.error('OrderService: getOrderDetails: err', err);
        }
      }

      console.log('OrderService: getOrderDetails: response: ', response);
      if (response.ok) {
        // const responseParsed = parseGetOrdersCollectionResponse(response.data);
        const responseParsed = response.data;
        dispatch(orderDetailsFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(orderDetailsRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(orderDetailsRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
