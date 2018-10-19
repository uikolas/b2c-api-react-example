import api, { setAuthToken } from '../api';
import { toast } from 'react-toastify';
import { RefreshTokenService } from '../Common/RefreshToken';
import {
  orderDetailsFulfilledStateAction,
  orderDetailsPendingStateAction,
  orderDetailsRejectedStateAction,
  ordersCollectionFulfilledStateAction,
  ordersCollectionPendingStateAction,
  ordersCollectionRejectedStateAction,
} from '../../actions/Pages/Order';
import { orderAuthenticateErrorText } from '../../constants/messages/errors';
import { parseGetOrderDetailsResponse, parseGetOrdersCollectionResponse } from '../../helpers/order/response';
import { TOrderId } from '../../interfaces/order';

export class OrderService {

  // Get collection of orders
  public static async getOrdersCollection(dispatch: Function): Promise<any> {
    try {
      dispatch(ordersCollectionPendingStateAction());

      let response: any;
      try {
        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(orderAuthenticateErrorText);
        }
        setAuthToken(token);
        response = await api.get('orders', null, {withCredentials: true});
      } catch (err) {
        console.error('OrderService: getOrdersCollection: err', err);
      }

      console.info('OrderService: getOrdersCollection: response: ', response);
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
      try {
        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(orderAuthenticateErrorText);
        }
        setAuthToken(token);
        const endpoint = `orders/${orderId}`;
        response = await api.get(endpoint, null, {withCredentials: true});
      } catch (err) {
        console.error('OrderService: getOrderDetails: err', err);
      }

      console.info('OrderService: getOrderDetails: response: ', response);
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
