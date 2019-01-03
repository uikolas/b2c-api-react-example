// tslint:disable:max-file-line-count

import api, { setAuthToken } from '../../api';
import { toast } from 'react-toastify';
import { TProductSKU } from 'src/shared/interfaces/product';
import {ICartAddItem, ICartDataResponse, TCartAddItemCollection, TCartId} from 'src/shared/interfaces/cart';
import { parseAddToCartResponse, parseCartCreateResponse } from 'src/shared/helpers/cart';
import * as cartActions from 'src/shared/actions/Common/Cart';
import { cartAddProducts, cartChangeQty, cartRemoveItems } from 'src/shared/constants/messages/cart';
import { cartAuthenticateErrorText } from 'src/shared/constants/messages/errors';
import { ApiServiceAbstract } from '../../apiAbstractions/ApiServiceAbstract';
import { RefreshTokenService } from '../RefreshToken/index';
import { ICartCreatePayload } from './types';
import {IResponseError} from "src/shared/services/apiAbstractions/types";
import {IApiResponseData} from "src/shared/services/types";

export class CartService extends ApiServiceAbstract {
  public static async getCustomerCarts(dispatch: Function): Promise<string> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) { throw new Error(cartAuthenticateErrorText); }
      setAuthToken(token);

      const response: IApiResponseData = await api.get('/carts', {}, {withCredentials: true});

      if (response.ok) {
        if (!response.data.data[0].id) {
          return '';
        }

        const responseParsed: ICartDataResponse = parseAddToCartResponse(response.data);
        dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        this.errorMessageInform(response, dispatch);
      }
    } catch (err) {
      dispatch(cartActions.getCartsRejectedStateAction(err.message));
      toast.error('Request Error: ' + err.message);
      return '';
    }
  }

  public static async cartCreate(dispatch: Function, payload: ICartCreatePayload): Promise<string> {
    try {
      dispatch(cartActions.cartCreatePendingStateAction());

      const body = {
        data: {
          type: 'carts',
          attributes: payload,
        },
      };

      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) { throw new Error(cartAuthenticateErrorText); }
      setAuthToken(token);

      const response: IApiResponseData = await api.post('carts', body, {withCredentials: true});

      if (response.ok) {
        const responseParsed = parseCartCreateResponse(response.data);
        dispatch(cartActions.cartCreateFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        this.errorMessageInform(response, dispatch);
        return '';
      }

    } catch (error) {
      dispatch(cartActions.cartCreateRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return '';
    }
  }

  // Adds an item to the cart.
  public static async cartAddItem(dispatch: Function, payload: ICartAddItem, cartId: TCartId): Promise<void> {
    try {
      dispatch(cartActions.cartAddItemPendingStateAction());

      const body = {
        data: {
          type: 'items',
          attributes: payload,
        },
      };

      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) { throw new Error(cartAuthenticateErrorText); }
      setAuthToken(token);

      const endpoint = `carts/${cartId}/items`;
      const response: IApiResponseData = await api.post(endpoint, body, {withCredentials: true});

      if (response.ok) {
        const responseParsed: ICartDataResponse  = parseAddToCartResponse(response.data);
        dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
        toast.success(cartAddProducts);
      } else {
        this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async createCartAndAddItem(dispatch: Function, payload: ICartCreatePayload, item: ICartAddItem) {
    const cartId = await CartService.cartCreate(dispatch, payload);

    if (cartId) {
      await CartService.cartAddItem(dispatch, item, cartId);
    }
  }

  public static async cartDeleteItem(ACTION_TYPE: string,
                                     dispatch: Function,
                                     cartId: TCartId,
                                     itemId: TProductSKU): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const endpoint = `carts/${cartId}/items/${itemId}`;
      const response: IApiResponseData = await api.delete(endpoint, {}, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadCartDeleteItemFulfilled: {itemId},
        });

        toast.success(cartRemoveItems);
        const newCartResponse: IApiResponseData = await api.get(`carts/${cartId}`);

        if (newCartResponse.ok) {
          const responseParsed: ICartDataResponse  = parseAddToCartResponse(newCartResponse.data);
          dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
        } else {
          this.errorMessageInform(newCartResponse, dispatch);
        }
      } else {
        this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error: error.message,
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  // Update cart item quantity.
  public static async cartUpdateItem(dispatch: Function, payload: ICartAddItem, cartId: TCartId | null): Promise<void> {
    try {
      dispatch(cartActions.cartUpdateItemPendingStateAction());

      const body = {
        data: {
          type: 'items',
          attributes: payload,
        },
      };
      const {sku} = payload;

      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) { throw new Error(cartAuthenticateErrorText); }
      setAuthToken(token);

      const endpoint = `carts/${cartId}/items/${sku}`;
      const response: IApiResponseData = await api.patch(endpoint, body, {withCredentials: true});

      if (response.ok) {
        const responseParsed: ICartDataResponse  = parseAddToCartResponse(response.data);
        dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
        toast.success(cartChangeQty);
      } else {
        this.errorMessageInform(response, dispatch);
      }

    } catch (error) {
      dispatch(cartActions.cartUpdateItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async moveItemsToCart(dispatch: Function, cartId: TCartId, productsList: string[]): Promise<void> {
    try {
      for (const sku of productsList) {
        const payload = { sku, quantity: 1 };

        await CartService.cartAddItem(dispatch, payload, cartId);
      }
    } catch (err) {
      dispatch(cartActions.cartAddItemRejectedStateAction(err.message));
      toast.error('Unexpected Error: ' + err.message);
    }
  }

  // Adds multiple items to the cart.
  public static async cartMultipleItems(dispatch: Function,
                                        payload: TCartAddItemCollection,
                                        cartId: TCartId | null,
                                        payloadCartCreate: ICartCreatePayload): Promise<void> {
    if (!payload) { return; }
    try {
      // Create cart if not exist
      if (!cartId) {
        try {
          cartId = await CartService.cartCreate(dispatch, payloadCartCreate);
        } catch (err) {
          console.error('await CartService.cartCreate err', err);
        }
      }

      // Global response
      let globalResponse: boolean = true;

      for (const item of payload) {
        if (!globalResponse) {
          dispatch(cartActions.cartAddItemRejectedStateAction('Error in processing adding products in sequence'));
          break;
        }
        dispatch(cartActions.cartAddItemPendingStateAction());
        const processResult = await this.addingItemProcess(dispatch, item, cartId);
        if (processResult.ok) {
          const responseParsed: ICartDataResponse  = parseAddToCartResponse(processResult.data);
          dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
          globalResponse = true;
        } else {
          this.errorMessageInform(processResult, dispatch);
          globalResponse = false;
        }
      }
    } catch (error) {
      dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  private static async addingItemProcess(dispatch: Function,
                                         payload: ICartAddItem,
                                         cartId: TCartId): Promise<IApiResponseData> {
    const body = {
      data: {
        type: 'items',
        attributes: payload,
      },
    };

    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) { throw new Error(cartAuthenticateErrorText); }
      setAuthToken(token);

      const endpoint = `carts/${cartId}/items`;
      const response: IApiResponseData = await api.post(endpoint, body, {withCredentials: true});
      return response;
    } catch (err) {
      console.error('CartService: cartAddItem: err', err);
    }
  }

  private static errorMessageInform(response: IResponseError, dispatch: Function): void {
    const errorMessage = this.getParsedAPIError(response);
    dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
    toast.error('Request Error: ' + errorMessage);
  }
}
