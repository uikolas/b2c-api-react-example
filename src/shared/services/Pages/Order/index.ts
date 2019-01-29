import api, { setAuthToken } from 'src/shared/services/api';
import { RefreshTokenService } from 'src/shared/services/Common/RefreshToken/index';
import {
    orderDetailsFulfilledStateAction,
    orderDetailsPendingStateAction,
    orderDetailsRejectedStateAction,
    ordersCollectionFulfilledStateAction,
    ordersCollectionPendingStateAction,
    ordersCollectionRejectedStateAction,
} from '@stores/actions/pages/order';
import { OrderAuthenticateErrorMessage } from 'src/shared/translation';
import { parseGetOrderDetailsResponse, parseGetOrdersCollectionResponse } from 'src/shared/helpers/order/response';
import { TOrderId } from 'src/shared/interfaces/order';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from 'src/shared/services/types';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';

export class OrderService extends ApiServiceAbstract {
    // Get collection of orders
    public static async getOrdersCollection(dispatch: Function): Promise<void> {
        try {
            dispatch(ordersCollectionPendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(OrderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.get('orders', null, {withCredentials: true});

            if (response.ok) {
                const responseParsed = parseGetOrdersCollectionResponse(response.data);
                dispatch(ordersCollectionFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(ordersCollectionRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: 'error'
                });
      }

        } catch (error) {
            dispatch(ordersCollectionRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: 'error'
          });
        }
    }

    // Get order by reference
    public static async getOrderDetails(dispatch: Function, orderId: TOrderId): Promise<void> {
        try {
            dispatch(orderDetailsPendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(OrderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const endpoint = `orders/${orderId}`;
            const response: IApiResponseData = await api.get(endpoint, null, {withCredentials: true});

            if (response.ok) {
                const responseParsed = parseGetOrderDetailsResponse(response.data.data);
                dispatch(orderDetailsFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(orderDetailsRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: 'error'
                });
      }

        } catch (error) {
            dispatch(orderDetailsRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: 'error'
          });
        }
    }
}
