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
import {parseGetOrderDetailsResponse, parseGetOrdersCollectionResponse} from "../orderHelper/response";
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
        let errorMessage = response.problem;
        if (response.data.errors[0].detail) {
          errorMessage = response.data.errors[0].detail;
        }
        dispatch(ordersCollectionRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
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
          response = await api.get(endpoint, null, { withCredentials: true });
        } catch (err) {
          console.error('OrderService: getOrderDetails: err', err);
        }
      }

      console.log('OrderService: getOrderDetails: response: ', response);
      if (response.ok) {
        const responseParsed = parseGetOrderDetailsResponse(response.data.data);
        dispatch(orderDetailsFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        let errorMessage = response.problem;
        if (response.data.errors[0].detail) {
          errorMessage = response.data.errors[0].detail;
        }
        dispatch(orderDetailsRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      dispatch(orderDetailsRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
