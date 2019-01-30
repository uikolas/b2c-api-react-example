import api, { removeAuthToken } from 'src/shared/services/api';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import { parseGuestCartResponse } from 'src/shared/helpers/cart';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import * as cartActions from '@stores/actions/common/cart';
import { IApiResponseData } from 'src/shared/services/types';
import { IResponseError } from 'src/shared/services/apiAbstractions/types';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';
import {
    typeMessageSuccess,
    typeMessageError
} from 'src/shared/constants/notifications';

export class GuestCartService extends ApiServiceAbstract {
    public static async guestCartAddItem(dispatch: Function, payload: ICartAddItem, anonymId: string): Promise<void> {
        try {
            removeAuthToken();

            dispatch(cartActions.cartAddItemPendingStateAction());

            const body = {
                data: {
                    type: 'guest-cart-items',
                    attributes: payload
                }
            };

            const response: IApiResponseData = await api.post(
                'guest-cart-items',
                body,
                {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}}
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'items.added.message',
                    type: typeMessageSuccess
                });
                const responseParsed = parseGuestCartResponse(response.data);
                dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
            } else {
                this.errorMessageInform(response, dispatch);
            }

        } catch (error) {
            dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });
        }
    }

    public static async getGuestCart(dispatch: Function, anonymId: string): Promise<string> {
        try {
            removeAuthToken();

            dispatch(cartActions.getCartsPendingStateAction());

            const response: IApiResponseData = await api.get(
                '/guest-carts', {},
                {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}}
            );

            if (response.ok) {
                if (!response.data.data.length) {
                    dispatch(cartActions.getCartsFulfilledStateAction(null));

                    return '';
                }

                const responseParsed = parseGuestCartResponse({
                    data: response.data.data[0],
                    included: response.data.included
                });
                dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));

                return responseParsed.id;
            } else {
                this.errorMessageInform(response, dispatch);

                return '';
            }

        } catch (error) {
            dispatch(cartActions.getCartsRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });

            return '';
        }
    }

    public static async guestCartRemoveItem(dispatch: Function,
                                            cartUid: string,
                                            sku: string,
                                            anonymId: string): Promise<void> {
        try {
            removeAuthToken();

            dispatch(cartActions.cartDeleteItemPendingStateAction);

            const response: IApiResponseData = await api.delete(
                `guest-carts/${cartUid}/guest-cart-items/${sku}`,
                {},
                {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}}
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeMessageSuccess
                });
                await GuestCartService.getGuestCart(dispatch, anonymId);
            } else {
                this.errorMessageInform(response, dispatch);
            }

        } catch (error) {
            dispatch(cartActions.getCartsRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });
        }
    }

    public static async guestCartUpdate(dispatch: Function,
                                        payload: ICartAddItem,
                                        cartId: TCartId,
                                        anonymId: string): Promise<void> {
        try {
            removeAuthToken();

            dispatch(cartActions.cartUpdateItemPendingStateAction());

            const body = {
                data: {
                    type: 'guest-cart-items',
                    attributes: payload
                }
            };
            const {sku} = payload;
            const response: IApiResponseData = await api.patch(
                `guest-carts/${cartId}/guest-cart-items/${sku}`,
                body,
                {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}}
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'cart.changed.quantity.message',
                    type: typeMessageSuccess
                });

                const responseParsed = parseGuestCartResponse(response.data);
                dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
            } else {
                this.errorMessageInform(response, dispatch);
            }

        } catch (error) {
            dispatch(cartActions.cartUpdateItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });
        }
    }

    private static errorMessageInform(response: IResponseError, dispatch: Function): void {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
        NotificationsMessage({
            messageWithCustomText: 'request.error.message',
            message: errorMessage,
            type: typeMessageError
        });
    }
}
